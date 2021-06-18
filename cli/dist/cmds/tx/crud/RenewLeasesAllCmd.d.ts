import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "renewLeasesAll <uuid> <lease>";
export declare const desc = "Renew leases of all key-values in uuid";
export declare const builder: (yargs: Argv) => Argv<{
    uuid: string | undefined;
} & {
    lease: number | undefined;
}>;
export declare const handler: (argv: {
    uuid: string;
    lease: number;
} & Flags) => Promise<void>;
//# sourceMappingURL=RenewLeasesAllCmd.d.ts.map