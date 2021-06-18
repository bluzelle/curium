import { Argv } from "yargs";
import { QueryCountRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "count <uuid>";
export declare const desc = "Query total number of key-values in given uuid";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
}>;
export declare const handler: (argv: QueryCountRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=CountCmd.d.ts.map