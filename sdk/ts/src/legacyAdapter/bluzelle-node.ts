import {API, APIOptions} from "./API";

export {API} from './API';
export {SearchOptions} from './API'
export {GasInfo} from './types/GasInfo'


export const bluzelle = (config: APIOptions): API => new API(config);



