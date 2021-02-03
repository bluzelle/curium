package keeper

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
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
	proofStr := fmt.Sprintf("%s%s", valcons, value)
	proof := []byte(proofStr)
	sum := sha256.Sum256(proof)
	return hex.EncodeToString(sum[:])
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
	b := GetVoteProofs()[source+valcons].VoteHash
	fmt.Println(proof, b)
	return proof == GetVoteProofs()[source+valcons].VoteHash

}

