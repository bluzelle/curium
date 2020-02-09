import {createImageFromFile, listImages} from "./ImageManager";
import {DockerImage} from "./DockerImage";
import {listContainers, startContainer} from "./ContainerManager";
import {Container as DockerContainer} from 'node-docker-api/lib/container'

export const listDaemonImages = (): Promise<DockerImage[]> =>
    listImages('integration');

const ensureBaseImage = (): Promise<boolean> =>
    listImages('integration')
        .then(images => !!images.find(image => image.shortName === 'base-image'))
        .then(result => result ? result : !!createImageFromFile('integration', 'base-image'));


export const startDaemon = async (name: string): Promise<boolean> => {
    await ensureBaseImage();
    startContainer('integration', 'base-image', name);
    return new Promise(() => {});
};

export const listDaemons = async (): Promise<Daemon[]> => {
    return listContainers()
        .then(containers => containers.map(c => new Daemon(c)))
};

export const stopDaemons = async (): Promise<boolean> => {

    console.log(await listContainers());
    return true;

};

export class Daemon {
    id: string;
    created: number;
    ports: any;
    state: string;
    container: DockerContainer;

    stop(): Promise<boolean> {
        console.log('xxxxx', (this.container.data as any).Status);
        return this.container.kill()
            .then((container: DockerContainer) => (container.data as any).Status === 'exited')
            .then((stopped: boolean) => stopped ? !!this.container.delete() : stopped)
    }

    constructor(dc: DockerContainer) {
        this.id = (dc.data as any).Id;
        this.ports = (dc.data as any).Ports;
        this.state = (dc.data as any).State;
        this.created = (dc.data as any).Created;
        this.container = dc;
    }
}



listDaemons().then(daemons => daemons.map(d => d.stop()));

//startDaemon('testing');

//createImageFromFile('integration', 'base-image');

//listImages('test').then(console.log);
