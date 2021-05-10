import {API, APIOptions} from "../../../src/legacyAdapter/API";
import puppeteer from "puppeteer";
import fs from "fs";
import {resolve} from "path";
import {clientProxyFactory} from "./clientProxyFactory";

let currentBrowser: any;

afterEach(() => currentBrowser?.close());

const isDebug = () => process.argv.includes('--debug');

export const browserProxy = async (bz: API, bluzelleConfig: APIOptions): Promise<API> => {
    currentBrowser = await puppeteer.launch({devtools: isDebug()});
    const page = await currentBrowser.newPage();

    await fs.promises.readFile(resolve(__dirname, '../../../node_modules/bluzelle/lib/bluzelle-js.js'))
        .then(buf => buf.toString())
        .then(content => page.addScriptTag({content}));

    await instantiateBluzelleClientInBrowser(bluzelleConfig);

    return clientProxyFactory(bz, executeBluzelleMethodInBrowser) as API;

    function executeBluzelleMethodInBrowser(method: string, args: any[]) {
        return page.evaluate((method: string, args: any[]) => {

            if(method === 'withTransaction') {
                return (window as any).bz.withTransaction(() => Promise.all(
                    args[0].map(({method, args}: {method: string, args: any[]}) => (window as any).bz[method](...args))
                ), args[1])
                    .then((result: any) => ({result}))
                    .catch((error: any) => ({error}))
            } else {
                const makeProxy = (x: any) => x instanceof Proxy ? x : Promise.resolve(x);
                return makeProxy((window as any).bz[method](...args))
                    .then((result: any) => ({result}))
                    .catch((error: any) => {
                        if(error instanceof Error) {
                            throw error
                        } else {
                            return {error: error}
                        }
                    })
            }
        }, method, args)
            .then((x: any) => {
                if(x.error) {
                    throw x.error
                } else {
                    return x.result;
                }
            })
    }

    function instantiateBluzelleClientInBrowser(bluzelleConfig: APIOptions) {
        return page.evaluate((bluzelleConfig: APIOptions) => {
                (window as any).bz = (window as any).bluzelle(bluzelleConfig)
        }, bluzelleConfig as any)

    }
}

