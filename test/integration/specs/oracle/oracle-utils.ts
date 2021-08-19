import {API} from "../../../../../blzjs/client";
import {passThrough} from "promise-passthrough";
import {listOracleSources, Source} from '@bluzelle/oracle-js'

const VALCONS = 'bluzellevalcons12345'

export const deleteVotes = (bz: API) =>
    bz.sendMessage({
        type: 'oracle/MsgOracleDeleteVotes',
        value: {
            Prefix: '2',
            Owner: bz.address
        }
    }, {gas_price: 0.002})

export const deleteSources = (bz: API): Promise<unknown> =>
    listOracleSources(bz)
        .then((sources: Source[]): any => sources.length && bz.withTransaction(() =>
                sources.map((source: Source) => deleteSource(bz, source.Name))
            )
        )

const deleteSource = (bz: API, name: string): Promise<any> =>
    bz.sendMessage({
        type: 'oracle/MsgOracleDeleteSource',
        value: {
            Name: name,
            Owner: bz.address
        }
    }, {gas_price: 0.002});

const awaitContext = (prop: string, fn: Function) => (state: Object) =>
    fn(state)
        .then((val: unknown) => ({...state, [prop]: val}))

const getValcons = (bz: API) => bz.abciQuery('custom/oracle/getValcons', {})
    .then(x => x.result)

const calculateProofSig = (bz: API, value: string) =>
    bz.abciQuery('custom/oracle/calculateVoteProofSig', {
    Value: value
})
        .then(x => x.result)


export const addVote = (bz: API, vote: any) =>
    Promise.resolve({bz: bz, vote: vote})
        .then(awaitContext('valcons', (ctx: any) => getValcons(ctx.bz)))
        .then(awaitContext('sig', (ctx: any) => calculateProofSig(ctx.bz, ctx.vote.Value)))
        .then(passThrough((ctx: any) =>
                bz.sendMessage({
                    type: 'oracle/MsgOracleVoteProof',
                    value: {
                        ValidatorAddr: ctx.valcons,
                        VoteSig: ctx.sig,
                        Owner: ctx.bz.address,
                        SourceName: ctx.vote.SourceName
                    }
                }, {gas_price: 0.002})
            )
        )
        .then(ctx =>
            ctx.bz.sendMessage({
                type: 'oracle/MsgOracleVote',
                value: {
                    ...vote,
                    Valcons: ctx.valcons,
                    Owner: ctx.bz.address,
                    Batch: ""
                }
            }, {gas_price: 0.002})
        )



