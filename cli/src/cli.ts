#!/usr/bin/env node
import yargs from 'yargs'

import {join} from 'path'


yargs(process.argv.slice(2))
    .commandDir(join(__dirname,'cmds'))
    .help()
    .demandCommand()
    .recommendCommands()
    .argv
