import { Argv } from "yargs";
import { QueryHasRequest } from "@bluzelle/sdk-js/lib/codec/crud/query";
export declare const command = "has <uuid> <key>";
export declare const desc = "Check if the specified key exists in given uuid";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
}>;
export declare const handler: (argv: QueryHasRequest & {
    node: string;
}) => Promise<void>;
//# sourceMappingURL=HasCmd.d.ts.map