//import {createImageFromFile, listImages} from "./ImageManager";
import {createImageFromFile, listImages} from "./ImageManager";
import {DockerImage} from "./DockerImage";

export const listDaemonImages = (): Promise<DockerImage[]> =>
    listImages('integration');

const ensureBaseImage = (): Promise<boolean> =>
    listImages('integration')
        .then(images => !!images.find(image => image.shortName === 'base-image'))
        .then(result => result ? result : !!createImageFromFile('integration', 'base-image'));


export const startDaemon = async (name: string): Promise<boolean> => {
    await ensureBaseImage();

    return new Promise(() => {});
};

startDaemon('testing');

//createImageFromFile('integration', 'base-image');

//listImages('test').then(console.log);
