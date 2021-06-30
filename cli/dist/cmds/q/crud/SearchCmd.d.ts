import { Argv } from "yargs";
import { QuerySearchRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "search <uuid> <prefix> [startkey] [limit]";
export declare const desc = "Search uuid according to given search string";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    prefix: string | undefined;
} & {
    startkey: string;
} & {
    limit: number;
}>;
export declare const handler: (argv: QuerySearchRequest & {
    startkey: string;
    limit: number;
} & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=SearchCmd.d.ts.map