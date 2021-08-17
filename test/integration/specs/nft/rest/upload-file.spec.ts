import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";
import {promises} from "fs"


import {getBzClient} from "../../../helpers/bluzelle-client";
import * as fs from "fs";
import * as path from "path";

describe('file upload', function()  {
    this.timeout(10000);
    let bz: API

    beforeEach(() => bz = getBzClient());


    it('should create a directory nft-upload/vendor in .blzd', () => {
        return fetch(`http://localhost:1317/nft/upload/Mintable/someHash/1`, {
            method: 'POST',
            body: "1"
        })
            .then(() => fs.existsSync(path.resolve(__dirname, `${process.env.HOME}/.blzd/nft-upload/Mintable`)))
            .then(resp => expect(resp).to.be.true)
    });

    it('should allow multiple simultaneous uploads to a node', () => {
        return Promise.all([
            fetch(`http://localhost:1317/nft/upload/Mintable/mintableHash/1`, {
            method: 'POST',
            body: "1"
        }), fetch(`http://localhost:1317/nft/upload/Crypto/cryptoHash/1`, {
                method: 'POST',
                body: "1"
            }),
        ])
            .then(() => fs.existsSync(path.resolve(__dirname, `${process.env.HOME}/.blzd/nft-upload/Mintable`)))
            .then(resp => expect(resp).to.be.true)
            .then(() => fs.existsSync(path.resolve(__dirname, `${process.env.HOME}/.blzd/nft-upload/Crypto`)))
            .then(resp => expect(resp).to.be.true)
    });

    it('should chunk up a large file', () => {
        let hash = Date.now().toString();
        return fetch(`http://localhost:1317/nft/upload/${hash}/1`, {
            method: 'POST',
            body: "1"
        })
            .then(() => fs.existsSync(path.resolve(__dirname, `${process.env.HOME}/.blzd/nft-upload/${hash}-0001`)))
            .then(resp => expect(resp).to.be.true)
            .then(() => fs.readFileSync(path.resolve(__dirname, `${process.env.HOME}/.blzd/nft-upload/${hash}-0001`)))
            .then(resp => expect(new TextDecoder().decode(resp)).to.equal("1"))
    });

});
