import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "multiupdate <uuid> <keyvalues..>";
export declare const desc = "Update multiple key values";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    keyvalues: unknown;
}>;
export declare const handler: (argv: {
    uuid: string;
    keyvalues: string[];
} & Flags) => Promise<void>;
//# sourceMappingURL=MultiUpdateCmd.d.ts.map