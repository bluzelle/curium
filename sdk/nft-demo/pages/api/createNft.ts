import {getSdk} from "../../getSdk";
import {BluzelleSdk} from "@bluzelle/sdk-js";
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  getSdk()
      .then((sdk: BluzelleSdk) => sdk.nft.tx.CreateNft({
          id: Date.now().toString(),
          hash: body.hash,
          mime: body.mime,
          meta: 'whatever metadata you want',
          creator: sdk.nft.address,
      }))
      .then((result: any) => res.end(JSON.stringify(result)))
      .catch(e => e)
}
