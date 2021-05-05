import {getSdk} from "../../getSdk";
import {BluzelleSdk, NftSdk} from "@bluzelle/sdk-js";
import {NextApiRequest, NextApiResponse} from "next";
import delay from "delay";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    getSdk()
        .then((sdk: BluzelleSdk) => waitForFullReplication(sdk, body.id))
        .then(() => res.end(JSON.stringify({id: body.id})))
}

const waitForFullReplication = (sdk: BluzelleSdk, id: string): Promise<unknown> =>
    sdk.nft.q.IsNftFullyReplicated({id})
        .then(response => response.isReplicated ? (
            true
        ):(
            delay(500)
                .then(() => waitForFullReplication(sdk, id))
        ))
