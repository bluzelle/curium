import {Container as DockerContainer} from "node-docker-api/lib/container";

export class Daemon {
    container: DockerContainer;


    constructor(dc: DockerContainer) {
        this.container = dc;
    }

    status(): Promise<any> {
        return this.container.exec.create({
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['blzcli', 'status']
        })
            .then(exec => exec.start({Detach: false}))
            .then(promisifyStream)
            .then(status => {
                return status.includes('ERROR:') ? null : status;
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