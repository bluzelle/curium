package keeper

import (
	"encoding/hex"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var voteProofs map[string]types.MsgOracleVoteProof

func (k Keeper) GetVoteProof(ctx sdk.Context, sourceName string, valcons string) types.MsgOracleVoteProof {
	var msg types.MsgOracleVoteProof
		proofStore := k.GetStore(ctx)
		proof := proofStore.Get([]byte(types.ProofStoreKey.MakeKey(sourceName, valcons)))
		k.cdc.MustUnmarshalBinaryBare(proof, &msg)
		return msg
}

func CalculateProofSig(value string) string {
	v := GetPrivateValidator()
	s, _ := v.Key.PrivKey.Sign([]byte(value))
	return hex.EncodeToString(s)
}

func (k Keeper) StoreVoteProof(ctx sdk.Context, msg types.MsgOracleVoteProof) {
	proofStore := k.GetStore(ctx)
	proofStore.Set([]byte(types.ProofStoreKey.MakeKey(msg.SourceName,msg.ValidatorAddr)), k.cdc.MustMarshalBinaryBare(msg))
}

func (k Keeper) IsVoteValid(ctx sdk.Context, msg types.MsgOracleVote) bool {
	validator, found := k.GetValidator(ctx, msg.Valcons)

	if validator.Jailed {
		logger.Info("Oracle vote received from jailed validator", "name", msg.SourceName, "valcons", msg.Valcons)
		return false
	}

	if !found {
		logger.Info("Oracle vote received from unknown validator", "name", msg.SourceName, "valcons", msg.Valcons)
	}

	if found {
		proofSignatureString := k.GetVoteProof(ctx, msg.SourceName, msg.Valcons).VoteSig
		proofSignature, _ := hex.DecodeString(proofSignatureString)
		isGood := validator.ConsPubKey.VerifyBytes([]byte(msg.Value), proofSignature)

		if !isGood {
			logger.Info("Oracle vote/proof mismatch", "name", msg.SourceName, "valcons", msg.Valcons)
		}

		return isGood
	}
	return false
}

func (k Keeper) SearchVoteProofs(ctx sdk.Context, prefix string) []types.MsgOracleVoteProof {
	iterator := sdk.KVStorePrefixIterator(k.GetStore(ctx), types.ProofStoreKey.MakeKey(prefix))
	defer iterator.Close()
	proofs := make([]types.MsgOracleVoteProof, 0)

	for ;iterator.Valid(); iterator.Next() {
		if ctx.GasMeter().IsPastLimit() {
			break
		}

		var v types.MsgOracleVoteProof
		value := iterator.Value()
		k.cdc.MustUnmarshalBinaryBare(value, &v)
		proofs = append(proofs, v)
	}
	return proofs
}

