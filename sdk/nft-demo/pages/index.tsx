import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {ChangeEvent, useState} from "react";
import {sha256} from 'js-sha256'
import {passThroughAwait} from "promise-passthrough";
import {contentType} from 'mime-types'
import React from 'react'
import {times} from 'lodash'

export default function Home() {
    const [state, setState] = useState<string>('ready')

    const onFileSelected = (ev: ChangeEvent<HTMLInputElement>) => {
        setState('uploading')
        ev.target.files?.[0].arrayBuffer()
            .then(data => uploadFile({data, mimeType: contentType(ev.target.files?.[0].name || '')} as Context))
            .then(ctx => setState(`done:${ctx.id}`))
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Bluzelle NFT storage demo"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h2 className={styles.title}>
                    Bluzelle NFT Reliable Storage
                </h2>
                <div style={{padding: 20}}>
                    <input id="image-file" type="file" onInput={onFileSelected}/>
                </div>
                <div style={{padding: 10}}>
                    {state.includes('done:') ? (
                        <>
                            <NodeLink port={1317} id={state.replace('done:', '')}/>
                            <NodeLink port={1327} id={state.replace('done:', '')}/>
                        </>
                    ) : (state)}
                </div>
            </main>

        </div>
    )
}

const NodeLink: React.FC<{ port: number, id: string }> = ({port, id}) => (
    <div style={{padding: 5}}>
        <a href={`http://localhost:${port}/nft/data/${id}`} target="_blank">
            node:{port}
        </a>
    </div>
)

interface Context {
    id: string
    data: ArrayBuffer
    chunks: ArrayBuffer[]
    mimeType: string
}

const splitDataIntoChunks = (data: ArrayBuffer, chunkSize = 500 * 1024): Promise<ArrayBuffer[]> =>
    Promise.all<ArrayBuffer>(
        times(Math.ceil(data.byteLength / chunkSize)).map(chunkNum =>
            new Promise(resolve => setTimeout(() =>
                resolve(data.slice(chunkSize * chunkNum, chunkSize * chunkNum + chunkSize))
            ))
        )
    )


const uploadFile = (ctx: Context): Promise<Context> =>
    splitDataIntoChunks(ctx.data)
        .then(chunks => ({...ctx, chunks}) as Context)
        .then(ctx => ({...ctx, hash: sha256(ctx.data)}))
        .then(passThroughAwait(ctx =>
            Promise.all(ctx.chunks.map((chunk, chunkNum) =>
                fetch(`http://localhost:1317/nft/upload/${ctx.hash}/${chunkNum}`, {
                    method: 'POST',
                    body: chunk
                })
            ))
        ))
        .then(ctx => fetch(`http://localhost:3000/api/createNft`, {
            method: 'POST',
            body: JSON.stringify({
                id: ctx.hash,
                hash: ctx.hash,
                mime: ctx.mimeType
            })
        }).then(resp => resp.json()).then(({id}) => ({...ctx, id})))



