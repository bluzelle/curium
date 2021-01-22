import * as util from "util";

const exec = util.promisify(require('child_process').exec);

export const blzcli = (...args):Promise<string> =>
    exec(`blzcli ${args.join(' ')}`);

export const STANDARD_GAS = '--gas auto --gas-adjustment 2 --gas-prices 0.002ubnt'
export const  BLOCK = '--broadcast-mode block'

