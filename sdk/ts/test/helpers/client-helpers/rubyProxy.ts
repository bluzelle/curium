import {API} from "../../../src/legacyAdapter/API";
import {BluzelleConfig} from "../../../src/legacyAdapter/types/BluzelleConfig";
import {clientProxyFactory} from "./clientProxyFactory";
import axios from 'axios';
import {snakeCase} from 'lodash';
import {deleteProxyContainer, startProxyContainer} from "./dockerfiles/DockerManager";
import {serializeRequests, waitForProxyUp} from "./client-helpers";

export const rubyProxy = async (bz: API, bluzelleConfig: BluzelleConfig): Promise<API> => {
console.log(bluzelleConfig);
const env = {
        MNEMONIC: bluzelleConfig.mnemonic,
        ENDPOINT: bluzelleConfig.endpoint,
        UUID: bluzelleConfig.uuid,
        DEBUG:  '1',
        PORT: '5000'
    } as any

    await deleteProxyContainer('ruby');
    await startProxyContainer('ruby', env);
    await waitForProxyUp(5000);

    return clientProxyFactory(bz, executeBluzelleMethod) as API;

    function executeBluzelleMethod (method: string, args: string[]) {
        return serializeRequests(() => axios.post('http://localhost:5000', {method: snakeCase(method), args}))
            .then(res => res.data)
            .then((data) => data === null ? undefined : data)
            .catch((err) => {
                const msg = err.response.data.raw_log || err.response.data.error || err.response.data;
                console.log(msg);
                throw new Error(msg)
            })
    }
};







