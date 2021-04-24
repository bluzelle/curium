import {Docker} from "node-docker-api";
import {pack} from 'tar-fs'
import {resolve} from 'path'


export const startProxyContainer = (lang: string, env: Record<string, string>): Promise<void> => {
    const docker: Docker = new Docker({socketPath: '/var/run/docker.sock'})
    return checkImageExists(docker, lang)
        .then(exists => exists || createImage(docker, lang))
        .then(success => {
            if (!success) throw 'image creation failed';
        })
        .then(() => createContainer(docker, lang, env))
        .catch((err) => {console.log('error starting proxy container', err)})
}

export const deleteProxyContainer = (lang: string): Promise<void> => {
    const docker: Docker = new Docker({socketPath: '/var/run/docker.sock'})
    const container = docker.container.get(`${lang}-proxy`);
    return container.stop()
        .finally(() => container.delete())
        .then(() => {})
        .catch(() => {console.log('unable to delete proxy container for', lang)});       // catch any errors because there might not be one.
}

const envToEnvArray = (env: Record<string, string>) =>
    Object.keys(env).map(key => `${key}=${env[key]}`);

const createContainer = (docker: Docker, lang: string, env: Record<string, string>): Promise<void> => {

    return docker.container.create({
        Image: `${lang}-proxy`,
        name: `${lang}-proxy`,
        ExposedPorts: {"5000/tcp": {}},
        Tty: true,
        HostConfig: {
            PortBindings: {
                '5000/tcp': [{HostPort: '5000'}],
            }
        },
        Env: envToEnvArray(env)
    })
        .then(container => container.start({

        }))
        .then(() => {})
}

const createImage = (docker: Docker, lang: string): Promise<boolean> => {
    const dockerfileDir = resolve(__dirname, lang)
    var tarStream: any = pack(dockerfileDir)

    return docker.image.build(tarStream, {
        t: `${lang}-proxy`,
        nocache: true
    })
        .then((stream: any) => promisifyStream(stream))
        .then(() => docker.image.get(`${lang}-proxy`).status())
        .then(status => !!status)
}

const promisifyStream = (stream: any): Promise<string> => new Promise((resolve, reject) => {
    stream.on('data', (data: Buffer) => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', (err: Error) => reject(err))
});

const checkImageExists = (docker: Docker, lang: string): Promise<boolean> => {
    return docker.image.list()
        .then(list => list.flatMap(it => (it.data as any).RepoTags))
        .then((arr: string[]) => arr.flat())
        .then((tagArrays) => tagArrays.includes(`${lang}-proxy:latest`))
}

