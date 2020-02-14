import {Container as DockerContainer} from "node-docker-api/lib/container";
import {listContainers, startContainer} from "./ContainerManager";
import {createImageFromFile, listImages} from "./ImageManager";
const delay = require('delay');
const {pack} = require('tar-stream');


export class Daemon {
    container: DockerContainer;

    static listDaemons = (): Promise<Daemon[]> =>
        listContainers()
            .then(containers => containers.filter(c => (c.data as any).Names.find((n:string) => /blz-/.test(n))))
            .then(containers => containers.map(c => new Daemon(c)));


    static stopDaemons = (): Promise<boolean[]> =>
        Daemon.listDaemons()
            .then(daemons => Promise.all(daemons.map(d => d.stop())));


    static async startDaemon (name: string): Promise<Daemon> {
        await ensureBaseImageExists();
        return startContainer('integration', 'base-image', `blz-${name}`)
            .then(container => new Daemon(container))

            //TODO: this is a hack to wait for the bluzelle stuff to initalize in the container, need to change to something more deterministic
            .then(async (daemon: Daemon): Promise<Daemon> => {
                await delay(2000);
                return daemon
            })
            .then(async (daemon: Daemon) => {
                const DEFAULT_PASS = 'jackjack';
                const script = `
                    echo "${DEFAULT_PASS}" | blzd add-genesis-account $(blzcli keys show validator -a) 10000000000bnt
                    echo ${DEFAULT_PASS} | blzd gentx --name validator --amount 100000000bnt
                    echo ${DEFAULT_PASS} | blzd collect-gentxs
                    sed -i -e \'s/minimum-gas-prices = ""/minimum-gas-prices = "0.01bnt"/g\' .blzd/config/app.toml
                    sed -i -e \'s/"bond_denom": "stake"/"bond_denom": "bnt"/g\' .blzd/config/genesis.json
                    sed -i -e \'s/127.0.0.1:26657/0.0.0.0:26657/g\' .blzd/config/config.toml
                    blzd start 
                `;
                await daemon.writeTextFile('setup.sh', script);
                await daemon.exec('/bin/sh -C /root/setup.sh', {detatched: true});
                return daemon;
            })
            .then(daemon => daemon.waitUntilRunning())
            // TODO: Hack to allow some setup otherwise tests fail.  Need something more deterministic
            .then(async (daemon) => {await delay(5000); return daemon})
    };


    constructor(dc: DockerContainer) {
        this.container = dc;
    }

    async writeTextFile(name: string, text: string, path: string = '/root'): Promise<Daemon> {
        return new Promise<Daemon>((resolve, reject) => {
            const p = pack();
            p.entry({name: name}, text, (err: Error) => {
                    if(err) {
                        reject(err)
                    } else {
                        p.finalize()
                    }
                    this.container.fs.put(p, {path: path})
                        .then(() => resolve(this))
                }
            );
        })
    }

    async getAuth(): Promise<DaemonAuth> {
        const result = await this.exec<DaemonAuth>('cat /root/keys-add-validator');
        return typeof result === 'string' ? {} as DaemonAuth : result;
    }

    getId(): Promise<string> {
        return this.status()
            .then(status => status.node_info.id);
    }

    exec<T = any>(cmd: string, {detatched = false}: ExecOptions = {detatched: false}): Promise<T | string> {
        return this.container.exec.create({
            AttachStdout: !detatched,
            AttachStderr: !detatched,
            Cmd: cmd.split(' '),
        })
            .then(exec => exec.start({Detatch: detatched}))
            .then(promisifyStream)
            .then(x => x.substr(8)) // knock off the 8 byte header
            .then(result => parseJson<T>(result))
    }

    status<T = any>(): Promise<T> {
        return this.exec('blzcli status')
            .then(status => typeof status === 'string' ? null : status)
    }

    stop(): Promise<boolean> {
        return this.container.kill()
            .finally(() => this.container.delete())
            .then(() => true);
    }

    waitUntilRunning(): Promise<Daemon> {
        return new Promise(resolve => {
            const looper = async () => {
                await this.isRunning() ? resolve(this) : setTimeout(looper, 1000);
            };
            looper();
        })
    }

    async isRunning(): Promise<boolean> {
        return this.status()
            .then(status => !!status)
    }
}

const promisifyStream = (stream: any): Promise<string> => new Promise((resolve, reject) => {
    let result: string = '';
    stream.on('data', (data: any) => result = `${result}${data}`);
    stream.on('end', () => resolve(result));
    stream.on('error', reject)
});

interface ExecOptions {
    detatched: boolean
}

const ensureBaseImageExists = (): Promise<boolean> =>
    listImages('integration')
        .then(images => !!images.find(image => image.shortName === 'base-image'))
        .then(result => result ? result : createImageFromFile('integration', 'base-image'));

const parseJson = <T>(string: string): T | string => {
    try {
        return JSON.parse(string)
    } catch(e) {
        return string
    }
};

export interface DaemonAuth {
    address: string
    pubkey: string
    mnemonic: string
}