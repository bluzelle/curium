package keeper

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/tendermint/tendermint/libs/log"
	"strings"
	"time"

	"github.com/bluzelle/curium/x/oracle/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var voteProofs map[string]types.MsgOracleVoteProof
var votes map[string][]types.Vote

// Keeper of the oracle store
type Keeper struct {
	sourceStoreKey  sdk.StoreKey
	voteStoreKey    sdk.StoreKey
	cdc        *codec.Codec
	paramspace types.ParamSubspace
}

// NewKeeper creates a oracle keeper
func NewKeeper(cdc *codec.Codec, sourceStoreKey sdk.StoreKey, paramspace types.ParamSubspace) Keeper {
	keeper := Keeper{
		sourceStoreKey: sourceStoreKey,
		cdc:       cdc,
		//		paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	return keeper
}

func (k Keeper) GetSourceStore(ctx sdk.Context) sdk.KVStore {
	return ctx.MultiStore().GetKVStore(k.sourceStoreKey)
	return ctx.KVStore(k.sourceStoreKey)
}

func (k Keeper) GetVoteStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.voteStoreKey)
}

func CreateVoteKey(valcons string, sourceName string) string {
	return fmt.Sprintf("%s>%s>%s", GetCurrentBatchId(), sourceName, valcons)
}

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

func GetCurrentBatchId() string {
	t := time.Date(
		time.Now().Year(),
		time.Now().Month(),
		time.Now().Day(),
		time.Now().Hour(),
		time.Now().Minute(),
		0,
		0,
		time.UTC,
	).String()
	t = strings.Replace(t, ":00 +0000 UTC", "", 1)
	t = strings.Replace(t, " ", "-", -1)
	return t
}



func (k Keeper) StoreVote(ctx sdk.Context, msg types.MsgOracleVote) string {
	key := CreateVoteKey(msg.Valcons, msg.SourceName)
	store := k.GetVoteStore(ctx)
	store.Set([]byte(key), k.cdc.MustMarshalBinaryBare(msg))
	return key
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

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) AddSource(ctx sdk.Context, name string, source types.Source) {
	store := k.GetSourceStore(ctx)
	store.Set([]byte(name), []byte(k.cdc.MustMarshalBinaryLengthPrefixed(source)))
}

func (k Keeper) GetSource(ctx sdk.Context, name string) (types.Source, error) {
	store := k.GetSourceStore(ctx)
	var source types.Source
	err := k.cdc.UnmarshalBinaryLengthPrefixed(store.Get([]byte(name)), &source)
	return source, err
}

func (k Keeper) DeleteSource(ctx sdk.Context, name string) error {
	store := k.GetSourceStore(ctx)
	store.Delete([]byte(name))
	return nil
}

func (k Keeper) ListSources(ctx sdk.Context) ([]types.Source, error) {
	store := k.GetSourceStore(ctx)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()
	var sources = make([]types.Source, 0)
	for ; iterator.Valid(); iterator.Next() {
		var source types.Source
		value := iterator.Value()
		k.cdc.UnmarshalBinaryLengthPrefixed(value, &source)
		sources = append(sources, source)
	}
	return sources, nil
}
