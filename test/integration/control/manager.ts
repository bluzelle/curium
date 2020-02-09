import {createImageFromFile, listImages} from "./ImageManager";
import {DockerImage} from "./DockerImage";
import {listContainers, startContainer} from "./ContainerManager";
import {Daemon} from "./Daemon";

export const listDaemonImages = (): Promise<DockerImage[]> =>
    listImages('integration');

const ensureBaseImage = (): Promise<boolean> =>
    listImages('integration')
        .then(images => !!images.find(image => image.shortName === 'base-image'))
        .then(result => result ? result : !!createImageFromFile('integration', 'base-image'));


export const startDaemon = async (name: string): Promise<Daemon> => {
    await ensureBaseImage();
    return startContainer('integration', 'base-image', name)
        .then(container => new Daemon(container))
        .then(daemon => daemon.waitUntilRunning())
};

export const listDaemons = (): Promise<Daemon[]> =>
     listContainers()
        .then(containers => containers.map(c => new Daemon(c)));


export const stopDaemons = (): Promise<boolean[]> =>
    listDaemons()
        .then(daemons => Promise.all(daemons.map(d => d.stop())));



//startDaemon('testing');

//createImageFromFile('integration', 'base-image');

//listImages('test').then(console.log);
