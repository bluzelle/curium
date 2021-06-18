import { Argv } from "yargs";
import { QuerySearchRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "search <uuid> <searchString>";
export declare const desc = "Search uuid according to given search string";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    searchString: string | undefined;
}>;
export declare const handler: (argv: QuerySearchRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=SearchCmd.d.ts.map