import {BluzelleSdk} from "@bluzelle/sdk-js";
import {Lease} from "@bluzelle/sdk-js/lib/codec/crud/lease";
import {readdir} from 'fs/promises'
import {readFile} from 'fs/promises'
import {normalize} from 'path'
import {Some} from "monet";
import {getBz} from "./getBz";

getBz()
    .then(writeSite)


function writeSite(bz: BluzelleSdk) {
    readFiles()
        .then(files => Promise.all(files.map(file =>
            bz.db.tx.Upsert({
                creator: bz.db.address,
                uuid: 'my-sitex',
                key: file.filename,
                value: file.data,
                lease: {days: 1} as Lease,
                metadata: new Uint8Array()
            })
        )))
    .then(() => console.log('DONE!!'))
}

interface File {
    filename: string
    data: Buffer
}

const getSiteFilename = (name: string): string => normalize('./site/' + name);

function readFiles(): Promise<File[]> {
    return readdir(getSiteFilename(''))
        .then(filenames =>
            Promise.all(filenames.map(filename =>
                Some(filename)
                    .map(getSiteFilename)
                    .map(readFile)
                    .map(p => p.then(data => ({
                        filename,
                        data
                    })))
                    .join()
            ))
        )

}

