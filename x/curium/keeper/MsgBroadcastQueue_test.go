package keeper_test

import (
	"github.com/bluzelle/curium/x/curium/keeper"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestMsgBroadcastQueue(t *testing.T) {
	t.Run("IsEmpty()", func(t *testing.T) {
		t.Run("should return true if queue is empty", func(t *testing.T) {
			assert.True(t, keeper.NewMsgBroadcastQueue().IsEmpty())
		})
	})

	t.Run("Push()", func(t *testing.T) {
		t.Run("should add an item to the queue", func(t *testing.T) {
			queue := keeper.NewMsgBroadcastQueue()
			queue.Push(&keeper.MsgBroadcastQueueItem{})
			assert.Equal(t, 1, queue.Size())
			queue.Push(&keeper.MsgBroadcastQueueItem{})
			assert.Equal(t, 2, queue.Size())
		})
	})

	t.Run("Pop()", func(t *testing.T) {
		t.Run("should remove the first item from the queue", func(t *testing.T) {
			queue := keeper.NewMsgBroadcastQueue()
			queue.Push(&keeper.MsgBroadcastQueueItem{
				From: "item1",
			})
			queue.Push(&keeper.MsgBroadcastQueueItem{
				From: "item2",
			})
			queue.Push(&keeper.MsgBroadcastQueueItem{
				From: "item3",
			})
			assert.Equal(t, "item1", queue.Pop().From)
			assert.Equal(t, "item2", queue.Pop().From)
			assert.Equal(t, "item3", queue.Pop().From)
			assert.Nil(t, queue.Pop())
		})
	})
}
