import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "rename <uuid> <key> <newKey>";
export declare const desc = "Rename a key-value from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
} & {
    newKey: string | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
    key: string;
    newKey: string;
} & Flags) => Promise<void>;
//# sourceMappingURL=RenameCmd.d.ts.map