import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "create <uuid> <key> <value> <lease>";
export declare const desc = "Create a key-value from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
} & {
    value: string | undefined;
} & {
    lease: number | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
    key: string;
    value: string;
    lease: number;
} & Flags) => Promise<void>;
//# sourceMappingURL=CreateCmd.d.ts.map