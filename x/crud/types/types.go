package types

type KeyLeasesSortable []*KeyLease

func (a KeyLeasesSortable) Len() int           { return len(a) }
func (a KeyLeasesSortable) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a KeyLeasesSortable) Less(i, j int) bool { return a[i].LeaseBlocks < a[j].LeaseBlocks }
