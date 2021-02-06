package keeper

import (
	"encoding/hex"
	"github.com/bluzelle/curium/x/oracle/types"
	"time"
)

var voteProofs map[string]types.MsgOracleVoteProof

func GetVoteProofs() map[string]types.MsgOracleVoteProof {
	if voteProofs == nil {
		voteProofs = make(map[string]types.MsgOracleVoteProof)
	}
	return voteProofs
}

func CalculateProofHash(valcons string, value string) string {
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

func (k Keeper) IsVoteValid(source string, valcons string, value string) bool {
	proof := CalculateProofHash(valcons, value)
	return proof == GetVoteProofs()[source+valcons].VoteHash
}

