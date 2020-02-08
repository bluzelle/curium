import {Image} from "node-docker-api/lib/image";
import {Docker} from "node-docker-api";
import {DockerImage} from "./DockerImage";

const docker = new Docker({socketPath: '/var/run/docker.sock'});


export const listImages = (prefix: string): Promise<DockerImage[]> => {
    const filterTestImages = (prefix: string) => (it: Image): Image[] => (it.data as any).RepoTags
        .filter((tag: string) => new RegExp(`^${prefix}\/`).test(tag))
        .length;

    return docker.image.list()
        .then((images: Image[]): Image[] => images.filter(filterTestImages(prefix)))
        .then((images: Image[]) => images.map<DockerImage>((image: Image): DockerImage => new DockerImage(image)));
};
