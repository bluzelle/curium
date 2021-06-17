import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "course fade coyote helmet canyon girl coil foster episode airport uniform minimum riot mirror gospel orange mystery lawn live distance december churn universe grid",
    url: "https://client.sentry.testnet.private.bluzelle.com:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));