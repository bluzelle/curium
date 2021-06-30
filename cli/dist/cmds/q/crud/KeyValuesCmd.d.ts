import { Argv } from "yargs";
import { QueryKeyValuesRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "keyvalues <uuid>";
export declare const desc = "Read all keys-values in uuid from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
}>;
export declare const handler: (argv: QueryKeyValuesRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=KeyValuesCmd.d.ts.map