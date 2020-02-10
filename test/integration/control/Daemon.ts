import {Container as DockerContainer} from "node-docker-api/lib/container";
import {listContainers, startContainer} from "./ContainerManager";
import {createImageFromFile, listImages} from "./ImageManager";

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
            .then(daemon => daemon.waitUntilRunning())
    };


    constructor(dc: DockerContainer) {
        this.container = dc;
    }

    getId(): Promise<string> {
        return this.status()
            .then(status => status.node_info.id);
    }

    exec(cmd: string): Promise<string> {
        return this.container.exec.create({
            AttachStdout: true,
            AttachStderr: true,
            Cmd: cmd.split(' ')
        })
            .then(exec => exec.start({Detatch: false}))
            .then(promisifyStream)
    }

    status(): Promise<any> {
        return this.exec('blzcli status')
            .then(status => {
                status = status
                    .split('\n')
                    .join('')
                    .replace(/.*?(\{.*\}).*/, '$1');
                return status.includes('ERROR:') ? null : JSON.parse(status);
            })
    }

    stop(): Promise<boolean> {
        return this.container.kill()
            .finally(() => this.container.delete())
            .then(() => true);
    }

    waitUntilRunning(): Promise<Daemon> {
        return new Promise(resolve => {
            const looper = async () => {
                await this.isRunning() ? resolve(this) : setTimeout(looper, 100);
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

const ensureBaseImageExists = (): Promise<boolean> =>
    listImages('integration')
        .then(images => !!images.find(image => image.shortName === 'base-image'))
        .then(result => result ? result : !!createImageFromFile('integration', 'base-image'));
