import jayson, {Server} from 'jayson/promise'
import {spawn, ChildProcess} from "child_process";
import {uniqueId} from 'lodash'

interface Daemon {
    process: ChildProcess
}

const daemons: {[key: string]: Daemon} = {};

const PORT: number = 5000;


// @ts-ignore
const server: Server = jayson.server({
    add: async ([a,b]: number[]): Promise<number> => a + b,
    start: async (): Promise<string> => {
        const id: string = uniqueId();
        const process: ChildProcess = spawn('blzd', ['init', id, '--chain-id', 'bluzelle-test']);
        daemons[id] = {process: process};
        return id;
    },
    killDaemon: async (id: string): Promise<void> =>
        daemons[id]?.process.kill()


});

server.http().listen(PORT);
console.log('Agent listening on port', PORT);

setTimeout(() => {

// @ts-ignore
    const client = jayson.client.http({
        port: PORT
    });

    client.request('start', []).then((response: any) => {
        console.log('result', response);
    });

}, 1000);


