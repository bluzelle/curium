import {Image} from "node-docker-api/lib/image";

export class DockerImage {
    id: string;
    size: number;
    name: string;
    shortName: string;
    created: number;


    constructor(image: Image) {
        this.id = (image.data as any).Id;
        this.created = (image.data as any).Created;
        this.name = (image.data as any).RepoTags[0];
        this.shortName = (image.data as any).RepoTags[0]
            .replace(new RegExp(/.*\/(.*):latest/), '$1');
        this.size = (image.data as any).Size;

    }
}

