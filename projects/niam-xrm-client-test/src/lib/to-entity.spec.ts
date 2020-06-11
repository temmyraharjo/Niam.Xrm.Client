import { expect } from 'chai';
import 'mocha';
import { toEntity } from './to-entity';

describe('to-entity', () => {
  const record = {
    name: 'A. Datum Corporation (sample)',
    'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue':
      'Default Value',
    address2_shippingmethodcode: 1,
    'revenue@OData.Community.Display.V1.FormattedValue': 'RM10,000.00',
    revenue: 10000,
    'statuscode@OData.Community.Display.V1.FormattedValue': 'Active',
    statuscode: 1,
    '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue':
      'Ringgit Malaysia',
    '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
      'transactioncurrencyid',
    '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname':
      'transactioncurrency',
    _transactioncurrencyid_value: 'd0d4d62d-799d-ea11-a812-000d3a80c79e',
  };

  it('can convert to entity', () => {
    const result = toEntity('account', 'id', record);
    expect(result.id).to.equal('id');
    expect(result.logicalName).to.equal('account');
  });
});
