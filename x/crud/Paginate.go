package crud

import (
	types2 "github.com/bluzelle/curium/x/crud/types"
	"github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
)

func Paginate(
	prefixStore types.KVStore,
	pageRequest *types2.PagingRequest,
	onResult func(key []byte, value []byte) error,
) (*types2.PagingResponse, error) {
	wrappedPageRequest := query.PageRequest{
		Key:        []byte(pageRequest.StartKey),
		Offset:     0,
		Limit:      pageRequest.Limit,
		CountTotal: false,
	}
	response, err := query.Paginate(prefixStore, &wrappedPageRequest, onResult)

	if err != nil {
		return nil, err
	}

	return &types2.PagingResponse{
		NextKey: string(response.NextKey),
		Total:   response.Total,
	}, nil

}
