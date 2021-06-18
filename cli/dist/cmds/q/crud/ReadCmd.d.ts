import { Argv } from "yargs";
import { QueryReadRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "read <uuid> <key>";
export declare const desc = "Read a key-value from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
}>;
export declare const handler: (argv: QueryReadRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=ReadCmd.d.ts.map