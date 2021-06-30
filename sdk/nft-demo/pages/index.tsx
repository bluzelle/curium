import React, {ChangeEvent, useState} from "react";
import {bluzelle} from '@bluzelle/sdk-js'
import {contentType} from "mime-types";
import {getUrl} from "../getSdk";
import {passThrough} from "promise-passthrough";

export default function Home() {
    const [state, setState] = useState<string>('ready')

    const onFileSelected = (ev: ChangeEvent<HTMLInputElement>) => {
        setState('uploading')
        ev.target.files?.[0].arrayBuffer()
            .then(data => bluzelle.helpers.nftHelpers.uploadNft(getUrl(1317, 1317), data as Uint8Array))
            .then(passThrough(() => setState('notifying network')))
            .then(ctx => fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/createNft' : `http://nft.bluzelle.com/api/createNft`, {
                method: 'POST',
                body: JSON.stringify({
                    hash: ctx.hash,
                    mime: contentType(ev.target.files?.[0].name || '')
                })
            }).then(resp => resp.json()).then(({id}) => ({...ctx, id})))
            .then(ctx => setState(`done:${ctx.id}`))
    }


    return (
        <div style={{background: '#0f0921', color: "white"}}>

            <main>
                <h2 style={{fontSize: '3em'}}>
                    Bluzelle NFT Reliable Storage
                </h2>
                <div style={{paddingTop: 20, paddingBottom: 20}}>
                    {state === 'ready' ? (
                        <input id="image-file" type="file" onInput={onFileSelected}/>
                    ) : (
                        state
                    )}
                </div>
                <div style={{paddingTop: 10}}>
                    {state.includes('done:') ? (
                        <>
                            <NodeLink id={state.replace('done:', '')}/>
                        </>
                    ) : null}
                </div>
            </main>

        </div>
    )
}

const NodeLink: React.FC<{ id: string }> = ({id}) => (
    <>
        <div style={{padding: 5}}>
            <a href={`https://client.sentry.testnet.private.bluzelle.com:1317/nft/data/${id}`} target="_blank">
                https://client.sentry.testnet.private.bluzelle.com:1317/nft/data/{id}
            </a>
        </div>
        <div style={{padding: 5}}>
            <a href={`https://a.client.sentry.testnet.private.bluzelle.com:1317/nft/data/${id}`} target="_blank">
                https://a.client.sentry.testnet.private.bluzelle.com:1317/nft/data/{id}
            </a>
        </div>
        <div style={{padding: 5}}>
            <a href={`https://b.client.sentry.testnet.private.bluzelle.com:1317/nft/data/${id}`} target="_blank">
                https://b.client.sentry.testnet.private.bluzelle.com:1317/nft/data/{id}
            </a>
        </div>
    </>
)


