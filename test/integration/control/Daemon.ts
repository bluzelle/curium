import {Container as DockerContainer} from "node-docker-api/lib/container";

export class Daemon {
    id: string;
    created: number;
    ports: any;
    state: string;
    container: DockerContainer;


    constructor(dc: DockerContainer) {
        this.id = (dc.data as any).Id;
        this.ports = (dc.data as any).Ports;
        this.state = (dc.data as any).State;
        this.created = (dc.data as any).Created;
        this.container = dc;
    }

    async stop(): Promise<boolean> {
        return this.isRunning()
            .then(async (isRunning): Promise<any> => isRunning && this.container.kill())
            .then(() => this.container.delete())
            .then(() => true);
    }

    async isRunning(): Promise<boolean> {
        const container = await this.container.status();
        return (container.data as any).State.Status === 'running'
    }
}