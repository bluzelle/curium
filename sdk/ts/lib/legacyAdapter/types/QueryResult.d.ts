export interface QueryCountResult {
    count: string;
}
export interface QueryKeysResult {
    keys: string[];
}
export interface QueryHasResult {
    has: boolean;
}
export interface QueryReadResult {
    value: string;
}
export interface QueryOwnerResult {
    owner: string;
}
export interface QueryKeyValuesResult {
    keyvalues: {
        key: string;
        value: string;
    }[];
}
export interface QueryGetLeaseResult {
    lease: number;
}
export interface QueryGetNShortestLeasesResult {
    keyleases: {
        key: string;
        lease: string;
    }[];
}
//# sourceMappingURL=QueryResult.d.ts.map