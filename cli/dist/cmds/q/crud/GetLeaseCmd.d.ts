import { Argv } from "yargs";
import { QueryGetLeaseRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "getlease <uuid> <key>";
export declare const desc = "Query remaining lease time on given key in specified uuid";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
}>;
export declare const handler: (argv: QueryGetLeaseRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=GetLeaseCmd.d.ts.map