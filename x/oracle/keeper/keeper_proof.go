package keeper

import (
	"encoding/hex"
	"github.com/bluzelle/curium/x/oracle/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"time"
)

var voteProofs map[string]types.MsgOracleVoteProof

func GetVoteProofs() map[string]types.MsgOracleVoteProof {
	if voteProofs == nil {
		voteProofs = make(map[string]types.MsgOracleVoteProof)
	}
	return voteProofs
}

func CalculateProofSig(value string) string {
	v := GetPrivateValidator()
	s, _ := v.Key.PrivKey.Sign([]byte(value))
	return hex.EncodeToString(s)
}

func (k Keeper) StoreVoteProof(msg types.MsgOracleVoteProof) {
	withinProofWindow := func() bool {
		return time.Now().Second() <= 20
	}

	// TODO: This is temp for testing
	withinProofWindow = func() bool { return true }

	if withinProofWindow() {
		GetVoteProofs()[msg.SourceName+msg.ValidatorAddr] = msg
	}
}

func (k Keeper) IsVoteValid(ctx sdk.Context, source string, valcons string, voteValue string) bool {
	consAddr, _ := sdk.ConsAddressFromBech32(valcons)
	validator, found := k.stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)

	if found {
		proofSignatureString := GetVoteProofs()[source+valcons].VoteSig
		proofSignature, _ := hex.DecodeString(proofSignatureString)
		good := validator.ConsPubKey.VerifyBytes([]byte(voteValue), proofSignature)
		return good
	}
	return false
}

