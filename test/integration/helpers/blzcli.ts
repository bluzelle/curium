import * as util from "util";

const exec = util.promisify(require('child_process').exec);

export const blzcli = (...args):Promise<string> =>
    exec(`blzcli ${args.join(' ')}`);

