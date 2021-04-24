export {API} from './bluzelle-node'
//export {BluzelleConfig} from './bluzelle-node'
export {SearchOptions} from './bluzelle-node'
export {bluzelle} from './bluzelle-node';
import {bluzelle} from './bluzelle-node'

typeof window === "undefined" || ((window as any).bluzelle = bluzelle);