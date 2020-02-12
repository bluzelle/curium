import {Container} from "node-docker-api/lib/container";
import {docker} from "./DockerManager";

export const startContainer = (prefix: string, imageName: string, containerName: string): Promise<Container> =>
    docker.container.create({
        Image: `${prefix}/${imageName}`,
        name: containerName,
        HostName: containerName,
        ExposedPorts: {
            "26657/tcp": {}
        },
        HostConfig: {

            PortBindings: {
                '26657/tcp': [{HostPort: '26657'}]
            }
        }
    })
        .then(container => container.start());

export const listContainers = ():Promise<Container[]> =>
    docker.container.list({all: true});

