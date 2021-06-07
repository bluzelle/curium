
import yargs from 'yargs'
import {getSdk} from "../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {join} from 'path'


// yargs(process.argv.slice(2))
//     .command(['start [app]', 'run', 'up'], 'Start up an app', {}, (argv) => {
//     console.log('starting up the', argv.app || 'default', 'app')
// })
//     .command({
//         command: 'configure <key> [value]',
//         aliases: ['config', 'cfg'],
//         builder: (yargs) => yargs.default('value', 'true'),
//         handler: (argv) => {
//             console.log(`setting ${argv.key} to ${argv.value}`)
//         }
//     })
//     .choices('configure', ['peanut-butter', 'jelly', 'banana', 'pickles'])
//     .demandCommand()
//     .help()
//     .wrap(72)
//     .argv

console.log(process.argv.slice(2))
console.log(join(__dirname,'cmds'))
yargs(process.argv.slice(2))
    .commandDir(join(__dirname,'cmds'), {
        extensions: ['ts']
    })
    .help()
    .demandCommand()
    .argv
