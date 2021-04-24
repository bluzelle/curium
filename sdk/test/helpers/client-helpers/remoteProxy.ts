import {API} from "../../../src/legacyAdapter/API";
import {clientProxyFactory} from "./clientProxyFactory";
import axios from 'axios';
import {getBluzelleClient, serializeRequests, defaultGasParams} from "./client-helpers";

const PROXY_PORT = process.env.PROXY_PORT;
const PROXY_ADDRESS = process.env.PROXY_ADDRESS;

beforeEach(async function () {
    if(getBluzelleClient() === 'remote') {
        this.timeout(50000);
        console.log('--------------------------------------------');
        await axios.post(`http://${PROXY_ADDRESS}:${PROXY_PORT}`, {method: 'deleteAll', args: [defaultGasParams()]})
    }
});

export const remoteProxy = async (bz: API): Promise<API> => {

    return clientProxyFactory(bz, executeBluzelleMethod) as API;

    function executeBluzelleMethod (method: string, args: any[]) {
        return serializeRequests(() => axios.post(`http://${PROXY_ADDRESS}:${PROXY_PORT}`, {method, args}))
            .then(res => res.data)
            .then((data) => data === null ? undefined : data)
            .catch((err) => {
                throw err.response.data
            })
    }

};





