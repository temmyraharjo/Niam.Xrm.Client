import { expect, assert } from 'chai';
import 'mocha';

describe('just test', () => {
    it('test can debug or not', () => {
        const result = 1 + 1;
        console.log(result);
        expect(result).to.equal(2);
    })
})