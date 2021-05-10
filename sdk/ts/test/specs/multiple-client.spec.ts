import {bluzelle} from '../../src/legacyAdapter/bluzelle-node'
import {API} from '../../src/legacyAdapter/API'
import {Some} from "monet";
import {pad, times, uniqueId} from 'lodash'
import {DEFAULT_TIMEOUT, sentryWithClient, defaultLease} from "../helpers/client-helpers/client-helpers";
import {expect} from 'chai'

class Config {
    NUMBER_OF_KEYS: number = 10
    NUMBER_OF_CLIENTS: number = 3
    VALUE_LENGTH: number = 100
}

const config = new Config();

describe('multiple clients in parallel', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it(`should be able to handle ${config.NUMBER_OF_KEYS} creates from ${config.NUMBER_OF_CLIENTS} parallel clients`, async () => {
        await createAccounts(bz, config.NUMBER_OF_CLIENTS)
            .then(fundAccounts(bz, config))
            .then(accounts => Promise.all(accounts.map(createKeys(config))))
            .then(accountsAndTimes => accountsAndTimes.map((x: any) => x.account))
            .then(verifyKeys(config));
    })
})

const verifyKeys = (config: Config) => (accounts: API[]) =>
    Promise.all(accounts.map(account =>
        Promise.all(times(config.NUMBER_OF_KEYS, n =>
            account.read(`key-${n}`)
                .then(x => expect(x).to.equal('x'.repeat(config.VALUE_LENGTH)))
        ))
    ))

const createKeys = (config: Config) => async (account: API): Promise<{account: API, time: number}> => {
    const start = Date.now()
    await account.withTransaction(() => times(config.NUMBER_OF_KEYS, n => account.create(`key-${n}`, 'x'.repeat(config.VALUE_LENGTH), defaultLease())));
    return {account, time: Date.now() - start}
}


const fundAccounts = (from: API, config: Config) => (accounts: API[]): Promise<any> => {
    return accounts.reduce((queueTail: Promise<any>, account) => {
            return queueTail.then(() => fundAccount(from, config, account))
        }, Promise.resolve()
    )
        .then(() => accounts)
}

const fundAccount = (from: API, config: Config, account: API): Promise<any> => account.getBNT()
    .then(amt => amt < config.NUMBER_OF_KEYS)
    .then(needsFunding => needsFunding ? from.transferTokensTo(account.address, config.NUMBER_OF_KEYS * 30000, defaultLease()).then(() => account) : account)


const createAccounts = (bz: API, numOfAccounts: number): Promise<API[]> => Promise.all(times(numOfAccounts, (n) => createAccount(bz, n)))


const createAccount = (bz: API, n: number): API =>
    Some(n)
        .map(n => pad(n.toString(), 64, '1'))
        .map(entropy => bz.generateBIP39Account(entropy))
        .map(mnemonic => bluzelle({
            mnemonic,
            endpoint: bz.url,
            uuid: Date.now().toString() + uniqueId()
        }))
        .join()

