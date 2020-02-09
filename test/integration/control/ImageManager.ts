import {Image} from "node-docker-api/lib/image";
import {DockerImage} from "./DockerImage";
import {Stream} from "stream";
import {docker} from "./DockerManager";

const tar = require('tar-fs');

const promisifyStream = (stream: Stream): Promise<Stream> => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()));
    stream.on('end', resolve);
    stream.on('error', reject);
});

export const listImages = (prefix: string): Promise<DockerImage[]> => {
    const filterTestImages = (prefix: string) => (it: Image): Image[] => (it.data as any).RepoTags
        .filter((tag: string) => new RegExp(`^${prefix}\/`).test(tag))
        .length;

    return docker.image.list()
        .then((images: Image[]): Image[] => images.filter(filterTestImages(prefix)))
        .then((images: Image[]) => images.map<DockerImage>((image: Image): DockerImage => new DockerImage(image)));
};

export const createImageFromFile = (prefix:string, name:string): Promise<DockerImage> => {
    var tarStream = tar.pack(`${__dirname}/dockerfiles`);
    return (docker.image.build(tarStream, {
        t: `${prefix}/${name}`
    }) as Promise<Stream>)
        .then((stream: Stream) => promisifyStream(stream))
        .then(() => docker.image.get(`${prefix}/${name}`).status())
        .then(image => new DockerImage(image))
};


