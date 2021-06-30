import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "renewlease <uuid> <key> <lease>";
export declare const desc = "Renew lease of a key-value in the database";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    key: string | undefined;
} & {
    lease: number | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
    key: string;
    lease: number;
} & Flags) => Promise<void>;
//# sourceMappingURL=RenewLeaseCmd.d.ts.map