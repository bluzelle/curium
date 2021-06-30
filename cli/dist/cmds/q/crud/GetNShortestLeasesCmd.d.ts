import { Argv } from "yargs";
import { QueryGetNShortestLeasesRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "getnshortestleases <uuid> <num>";
export declare const desc = "Query remaining lease time of [num] shortest leases in [uuid]";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    num: number | undefined;
}>;
export declare const handler: (argv: QueryGetNShortestLeasesRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=GetNShortestLeasesCmd.d.ts.map