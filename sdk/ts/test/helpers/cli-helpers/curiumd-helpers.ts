import * as util from "util";


process.env.PATH = process.env.PATH + ':/Users/avendauz/go/bin:'

const exec = util.promisify(require('child_process').exec);

export const curiumd = (...args: any[]):Promise<string> =>
    exec(`curiumd ${args.join(' ')}`);

export const execute = (...args: any[]):Promise<string> =>
    exec(args.join(' '));

export const STANDARD_GAS = '--gas auto --gas-adjustment 2 --gas-prices 0.002ubnt'
export const  BLOCK = '--broadcast-mode block'