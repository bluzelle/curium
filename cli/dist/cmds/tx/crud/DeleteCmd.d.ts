import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "delete <uuid> <key>";
export declare const desc = "Remove a key-value from the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
    key: string;
} & Flags) => Promise<void>;
//# sourceMappingURL=DeleteCmd.d.ts.map