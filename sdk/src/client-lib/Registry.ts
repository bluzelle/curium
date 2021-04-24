import {GeneratedType, Registry} from "@cosmjs/proto-signing";
import {defaultRegistryTypes} from "@cosmjs/stargate";
import {memoize} from "lodash"

const registryTypes: [string, GeneratedType][] = [...defaultRegistryTypes]
export let myRegistry = new Registry(registryTypes)
export const addMessageType = memoize<(typeURL: string, type: GeneratedType) => void>((typeUrl: string, type: GeneratedType) => {
    registryTypes.push([typeUrl, type]);
    myRegistry = new Registry(registryTypes);
})