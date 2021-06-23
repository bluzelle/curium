import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "multiUpdate <uuid> <keyValues..>";
export declare const desc = "Update multiple key values";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    keyValues: unknown;
}>;
export declare const handler: (argv: {
    uuid: string;
    keyValues: string[];
} & Flags) => Promise<void>;
//# sourceMappingURL=MultiUpdateCmd.d.ts.map