#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var path_1 = require("path");
yargs_1.default(process.argv.slice(2))
    .commandDir(path_1.join(__dirname, 'cmds'), {
    extensions: ['ts']
})
    .help()
    .demandCommand()
    .argv;
