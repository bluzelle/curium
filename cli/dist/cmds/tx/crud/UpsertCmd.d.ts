import { Argv } from "yargs";
import { Flags } from "../../../helpers/sdk-helpers";
export declare const command = "upsert <uuid> <key> <value> <lease>";
export declare const desc = "Upsert a key-value from the database";
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
//# sourceMappingURL=UpsertCmd.d.ts.map