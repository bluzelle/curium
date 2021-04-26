import {bluzelle} from "../../src/bz-sdk/bz-sdk";
import {expect} from 'chai'


describe('newMnemonic()', () => {
    it("should throw an error if given invalid length seed", () => {
        expect(bluzelle.newMnemonic('aaa')).to.equal('Invalid entropy');
    });

    it('should generate a mnemonic given a seed', () => {
        expect(bluzelle.newMnemonic('4b7458f941d797d4a2e40cc1e28b15cf17fa8e2f540f66354eb99150777fa844')).to.equal('enter people dinner lonely just tumble merit light sea begin shell owner leisure either run limit great price purpose cargo alter save patient nominee')
    });

    it('should generate a random mnemonic if not given a seed', () => {
        const a = bluzelle.newMnemonic();
        const b = bluzelle.newMnemonic();
        expect(a.split(' ')).to.have.length(24);
        expect(b.split(' ')).to.have.length(24);
        expect(a).to.not.equal(b);
    });
});