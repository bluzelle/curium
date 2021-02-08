package keeper

import (
	"encoding/hex"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var voteProofs map[string]types.MsgOracleVoteProof

func (k Keeper) GetProofStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.proofStoreKey)
}

func (k Keeper) GetVoteProof(ctx sdk.Context, sourceName string, valcons string) types.MsgOracleVoteProof {
	var msg types.MsgOracleVoteProof
		proofStore := k.GetProofStore(ctx)
		proof := proofStore.Get([]byte(sourceName + valcons))
		k.cdc.MustUnmarshalBinaryBare(proof, &msg)
		return msg
}

func CalculateProofSig(value string) string {
	v := GetPrivateValidator()
	s, _ := v.Key.PrivKey.Sign([]byte(value))
	return hex.EncodeToString(s)
}

func (k Keeper) StoreVoteProof(ctx sdk.Context, msg types.MsgOracleVoteProof) {
	proofStore := k.GetProofStore(ctx)
	proofStore.Set([]byte(msg.SourceName + msg.ValidatorAddr), k.cdc.MustMarshalBinaryBare(msg))
}

func (k Keeper) IsVoteValid(ctx sdk.Context, source string, valcons string, voteValue string) bool {
	validator, found := k.GetValidator(ctx, valcons)

	if validator.Jailed {
		return false
	}

	if found {
		proofSignatureString := k.GetVoteProof(ctx, source, valcons).VoteSig
		proofSignature, _ := hex.DecodeString(proofSignatureString)
		good := validator.ConsPubKey.VerifyBytes([]byte(voteValue), proofSignature)
		return good
	}
	return false
}

