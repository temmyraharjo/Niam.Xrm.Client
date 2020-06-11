import { expect } from 'chai';
import 'mocha';
import { update } from './update';

describe('update', () => {
  it('can update', () => {
    const source = {
      id: 'id',
      logicalName: 'entity',
      name: 'source-name',
      fullname: 'not-changed',
    };
    const target = {
      id: 'id',
      logicalName: 'entity',
      name: 'changes',
    };

    const result = update(source, target);
    expect(result.name).to.equal('changes');
    expect(result.fullname).to.equal('not-changed');
  });
});
