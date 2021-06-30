import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "deleteall <uuid>";
export declare const desc = "Remove all key-values from specified uuid";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
} & Flags) => Promise<void>;
//# sourceMappingURL=DeleteAllCmd.d.ts.map