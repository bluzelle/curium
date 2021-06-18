import { Argv } from "yargs";
import { QueryKeysRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "keys <uuid>";
export declare const desc = "Read all keys in uuid from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
}>;
export declare const handler: (argv: QueryKeysRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=KeysCmd.d.ts.map