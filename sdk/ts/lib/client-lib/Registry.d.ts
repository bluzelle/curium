/// <reference types="lodash" />
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
export declare const registryTypes: [string, GeneratedType][];
export declare let myRegistry: Registry;
export declare const addMessageType: ((typeURL: string, type: GeneratedType) => void) & import("lodash").MemoizedFunction;
export declare const getMyRegistry: () => Registry;
//# sourceMappingURL=Registry.d.ts.map