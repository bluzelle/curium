package keeper

import sdk "github.com/cosmos/cosmos-sdk/types"

type MsgBroadcastQueueItem struct {
	Msgs []sdk.Msg
	From string
	RetryCount int
	Resp chan *MsgBroadcasterResponse
}

func (mqi *MsgBroadcastQueueItem) IncrementRetry() {
	mqi.RetryCount = mqi.RetryCount + 1
}

type MsgBroadcastQueue struct {
	queue []*MsgBroadcastQueueItem
}

func NewMsgBroadcastQueue() *MsgBroadcastQueue {
	return &MsgBroadcastQueue{}
}

func (mq *MsgBroadcastQueue) Push(item *MsgBroadcastQueueItem) {
	mq.queue = append(mq.queue, item)
}

func (mq *MsgBroadcastQueue) Size() int {
	return len(mq.queue)
}

func (mq *MsgBroadcastQueue) Pop() *MsgBroadcastQueueItem {
	if !mq.IsEmpty() {
		item := mq.queue[0]
		mq.queue = mq.queue[1:]
		return item
	}
	return nil
}

func (mq *MsgBroadcastQueue) IsEmpty() bool {
	return len(mq.queue) == 0
}