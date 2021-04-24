import {API} from "../../../src/legacyAdapter/API";

export const clientProxyFactory = (obj: any, execFn: (method: string, args: any[]) => Promise<any>) =>
    new Proxy(obj, {
        get: (obj: API, prop: string) =>
            typeof (obj as any)[prop] === 'function' ? proxyFunction(prop, execFn) : (obj as any)[prop]
    })

let insideTransactionMethods: any[] | undefined = undefined;

const proxyFunction = (prop: string, execFn: (method: string, args: any[]) => Promise<any>) =>
    (...args: any) => {
        if(prop === 'withTransaction') {
            console.log('proxy: transaction start');
            insideTransactionMethods = [];
            args[0]();
            const insideFunctions = insideTransactionMethods;
            insideTransactionMethods = undefined;
            console.log('proxy: transaction end');
            return execFn('withTransaction', [insideFunctions, args[1]])
        }
        if(insideTransactionMethods) {
            console.log('proxy', prop, args);
            insideTransactionMethods.push({method: prop, args});
            return;
        }
        return execFn(prop, args);
    }

