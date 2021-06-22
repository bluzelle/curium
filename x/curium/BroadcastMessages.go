package curium

import (
	"context"
	sdkclient "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	signing2 "github.com/cosmos/cosmos-sdk/x/auth/signing"
	types3 "github.com/tendermint/tendermint/abci/types"
	types2 "github.com/tendermint/tendermint/types"
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

type MsgBroadcaster func(ctx sdk.Context, msgs []types.Msg, from string) chan *MsgBroadcasterResponse

type MsgBroadcasterResponse struct {
	Response *types3.TxResult
	Data *[]byte
	Error error
}

func NewMsgBroadcaster(accKeeper *keeper.AccountKeeper, keyringDir string) MsgBroadcaster {
	return func(ctx sdk.Context, msgs []types.Msg, from string) chan *MsgBroadcasterResponse {
		resp := make(chan *MsgBroadcasterResponse)

		go func() {
			returnError := func(err error) {
				resp <- &MsgBroadcasterResponse{
					Error: err,
				}
				close(resp)
			}
			// Choose your codec: Amino or Protobuf. Here, we use Protobuf, given by the
			// following function.
			encCfg := simapp.MakeTestEncodingConfig()

			// Create a new TxBuilder.
			txBuilder := encCfg.TxConfig.NewTxBuilder()

			err := txBuilder.SetMsgs(msgs...)
			if err != nil {
				returnError(err)
				return
			}

			gas := uint64(40000000)
			txBuilder.SetGasLimit(gas)

			txBuilder.SetFeeAmount(types.NewCoins(types.NewCoin("ubnt", types.NewInt(10000000))))
			txBuilder.SetMemo("memo")
			txBuilder.SetTimeoutHeight(uint64(ctx.BlockHeight() + 20))

			kr, err := keyring.New("curium", keyring.BackendTest, keyringDir, nil)
			if err != nil {
				returnError(err)
				return
			}
			keys, err := kr.Key(from)
			if err != nil {
				returnError(err)
				return
			}

			addr := keys.GetAddress()
			accnt := accKeeper.GetAccount(ctx, addr)
			if accnt == nil {
				returnError(sdkerrors.New("curium", 2, "Cannot broadcast message, accnt does not exist"))
				return
			}

			privArmor, err := kr.ExportPrivKeyArmor(from, "")
			if err != nil {
				returnError(err)
				return
			}

			privKey, _, err := crypto.UnarmorDecryptPrivKey(privArmor, "")
			if err != nil {
				returnError(err)
				return
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
				returnError(err)
				return
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
				returnError(err)
				return
			}

			err = txBuilder.SetSignatures(sigV2)
			if err != nil {
				returnError(err)
				return
			}

			txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
			if err != nil {
				returnError(err)
				return
			}

			txCtx, _ := context.WithDeadline(context.Background(), time.Now().Add(time.Second*20))

			client, err := sdkclient.NewClientFromNode("http://localhost:26657")
			if err != nil {
				returnError(err)
				return
			}

			res, err := client.BroadcastTxSync(txCtx, txBytes)
			if err != nil {
				returnError(err)
				return
			}

			_ = res

			client.Start()

			sub, err := client.Subscribe(txCtx, "MsgBroadcaster",   types2.EventQueryTxFor(txBytes).String())
			if err != nil {
				returnError(err)
				return
			}
			result := <- sub
			_ = result


			a := result.Data.(types2.EventDataTx)

			resp <- &MsgBroadcasterResponse{
				Response: &a.TxResult,
				Data: &a.TxResult.Result.Data,
			}
		    close(resp)
			client.Stop()
		}()

		return resp
	}

}
