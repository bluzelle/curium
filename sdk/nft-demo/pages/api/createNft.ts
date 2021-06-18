import {getSdk} from "../../getSdk";
import {BluzelleSdk} from "@bluzelle/sdk-js";
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    const id = Date.now().toString()
    return getSdk()
        .then((sdk: BluzelleSdk) => sdk.nft.tx.CreateNft({
            id,
            hash: body.hash,
            mime: body.mime,
            meta: 'whatever metadata you want',
            creator: sdk.nft.address,
        }))
        .then((result: any) => res.end(JSON.stringify({id})))
        .catch(e => console.log('ERROR: ', e))
}
