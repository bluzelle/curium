import {API, bluzelle} from '@bluzelle/db-js'
import {addMessageType} from "@bluzelle/db-js/lib/services/Registry";
import {MsgTestSendVote, MsgTestSendVoteResponse} from "./codec/testing/tx";

addMessageType('/bluzelle.curium.testing.MsgTestSendVote', MsgTestSendVote)

export const getBzClient = () => bluzelle({
    mnemonic: "panic spice tenant find bomb please loud file van arrive stereo fresh universe surface mistake topple purity come yellow pave chef short visa pet",
    endpoint: 'http://localhost:26657',
    uuid: ''
});


export const sendVoteMessage = (bz: API): Promise<MsgTestSendVoteResponse> =>
    bz.getAddress()
        .then(address =>
            bz.sendMessage<MsgTestSendVote>({
                typeUrl:  "/bluzelle.curium.testing.MsgTestSendVote",
                value: {
                    creator: address,
                    id: "test-vote",
                    value: new TextEncoder().encode("test-value"),
                    from: "binance",
                    voteType: "test-vote-type"
                }
            }, {gas_price: 0.002})
        )







