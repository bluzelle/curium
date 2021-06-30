import { Argv } from "yargs";
import { QueryMyKeysRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "mykeys <address> <uuid> [startkey] [limit]";
export declare const desc = "Read all keys in uuid owned by given address";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    address: string | undefined;
} & {
    startkey: string;
} & {
    limit: number;
}>;
export declare const handler: (argv: QueryMyKeysRequest & {
    startkey: string;
    limit: number;
} & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=MyKeysCmd.d.ts.map