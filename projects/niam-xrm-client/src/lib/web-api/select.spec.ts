import { expect } from 'chai';
import { select } from './select';
import { TestEntity, ENTITY_METADATA } from './test-definitions.spec';

describe('web-api/select', () => {
  it('query select multiple attributes', () => {
    expect(select<TestEntity>(ENTITY_METADATA, ['name', 'lookupid']))
      .to.equal('$select=name,_lookupid_value');
  });

  it('query select: lookup', () => {
    expect(select<TestEntity>(ENTITY_METADATA, ['lookupid']))
      .to.equal('$select=_lookupid_value');
  });
});
