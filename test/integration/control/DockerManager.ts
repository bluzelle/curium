import {Docker} from "node-docker-api";

export const docker = new Docker({socketPath: '/var/run/docker.sock'});