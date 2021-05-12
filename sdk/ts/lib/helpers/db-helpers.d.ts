import { DbSdk } from "../bz-sdk/bz-sdk";
export interface DbHelpers {
    getCosmos: (sdk: DbSdk) => Promise<any>;
}
export declare const dbHelpers: (sdk: DbSdk) => DbHelpers;
//# sourceMappingURL=db-helpers.d.ts.map