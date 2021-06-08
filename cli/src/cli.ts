
import yargs from 'yargs'
import {getSdk} from "../../sdk/ts/test/helpers/client-helpers/sdk-helpers";

import {join} from 'path'


yargs(process.argv.slice(2))
    .commandDir(join(__dirname,'cmds'), {
        extensions: ['ts']
    })
    .help()
    .demandCommand()
    .argv
