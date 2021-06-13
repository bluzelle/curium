package curium

import (
	"context"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	signing2 "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"google.golang.org/grpc"
	"time"
)

type KeyRingReader struct{ keyringDir string }

func NewKeyRingReader(keyringDir string) *KeyRingReader {
	return &KeyRingReader{
		keyringDir: keyringDir,
	}
}
func (krr KeyRingReader) GetAddress(name string) (sdk.AccAddress, error) {
	kr, err := keyring.New("curium", keyring.BackendTest, krr.keyringDir, nil)
	if err != nil {
		return nil, err
	}
	keys, err := kr.Key(name)
	if err != nil {
		return nil, err
	}
	return keys.GetAddress(), nil

}

type MsgBroadcaster func(ctx sdk.Context, msgs []types.Msg, from string) (*txtypes.BroadcastTxResponse, error)

func NewMsgBroadcaster(accKeeper *keeper.AccountKeeper, keyringDir string) func(ctx sdk.Context, msgs []types.Msg, from string) (*txtypes.BroadcastTxResponse, error) {
	return func(ctx sdk.Context, msgs []types.Msg, from string) (*txtypes.BroadcastTxResponse, error) {
		// Choose your codec: Amino or Protobuf. Here, we use Protobuf, given by the
		// following function.
		encCfg := simapp.MakeTestEncodingConfig()

		// Create a new TxBuilder.
		txBuilder := encCfg.TxConfig.NewTxBuilder()

		err := txBuilder.SetMsgs(msgs...)
		if err != nil {
			return nil, err
		}

		gas := uint64(40000000)
		txBuilder.SetGasLimit(gas)

		txBuilder.SetFeeAmount(types.NewCoins(types.NewCoin("ubnt", types.NewInt(10000000))))
		txBuilder.SetMemo("memo")
		txBuilder.SetTimeoutHeight(uint64(ctx.BlockHeight() + 20))

		kr, err := keyring.New("curium", keyring.BackendTest, keyringDir, nil)
		if err != nil {
			return nil, err
		}
		keys, err := kr.Key(from)
		if err != nil {
			return nil, err
		}

		addr := keys.GetAddress()
		accnt := accKeeper.GetAccount(ctx, addr)
		if accnt == nil {
			return nil, sdkerrors.New("curium", 2, "Cannot broadcast message, accnt does not exist")
		}

		privArmor, err := kr.ExportPrivKeyArmor(from, "")
		if err != nil {
			return nil, err
		}

		privKey, _, err := crypto.UnarmorDecryptPrivKey(privArmor, "")
		if err != nil {
			return nil, err
		}

		sigV2 := signing.SignatureV2{
			PubKey: keys.GetPubKey(),
			Data: &signing.SingleSignatureData{
				SignMode:  encCfg.TxConfig.SignModeHandler().DefaultMode(),
				Signature: nil,
			},
			Sequence: accnt.GetSequence(),
		}

		err = txBuilder.SetSignatures(sigV2)
		if err != nil {
			return nil, err
		}

		signerData := signing2.SignerData{
			ChainID:       ctx.ChainID(),
			AccountNumber: accnt.GetAccountNumber(),
			Sequence:      accnt.GetSequence(),
		}
		_ = signerData
		sigV2, err = tx.SignWithPrivKey(
			encCfg.TxConfig.SignModeHandler().DefaultMode(), signerData,
			txBuilder, privKey, encCfg.TxConfig, accnt.GetSequence())
		if err != nil {
			return nil, err
		}

		err = txBuilder.SetSignatures(sigV2)
		if err != nil {
			return nil, err
		}

		txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
		if err != nil {
			return nil, err
		}

		grpcConn, err := grpc.Dial(
			"127.0.0.1:9090",    // Or your gRPC server address.
			grpc.WithInsecure(), // The SDK doesn't support any transport security mechanism.
		)
		if err != nil {
			return nil, err
		}
		defer grpcConn.Close()

		txCtx, _ := context.WithDeadline(context.Background(), time.Now().Add(time.Second*20))

		// Broadcast the tx via gRPC. We create a new client for the Protobuf Tx
		// service.
		//	var ctx context.Context
		txClient := txtypes.NewServiceClient(grpcConn)
		// We then call the BroadcastTx method on this client.
		res, err := txClient.BroadcastTx(
			txCtx,
			&txtypes.BroadcastTxRequest{
				Mode:    txtypes.BroadcastMode_BROADCAST_MODE_BLOCK,
				TxBytes: txBytes, // Proto-binary of the signed transaction, see previous step.
			},
		)
		if err != nil {
			return nil, err
		}
		if res.TxResponse.Code != 0 {
			return nil, sdkerrors.New(res.TxResponse.Codespace, res.TxResponse.Code, res.TxResponse.RawLog)
		}
		return res, nil
	}

}
