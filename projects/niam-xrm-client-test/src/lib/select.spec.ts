import { expect } from 'chai';
import 'mocha';
import { Entity } from './definitions/entity';
import { select } from './select';

describe('select', () => {
  it('can return selected attributes', () => {
    const record: Entity = {
      logicalName: 'entity',
      id: 'id',
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
    const result = select(
      record,
      'name,statuscode,_transactioncurrencyid_value'
    );
    expect(result.name).to.equal('A. Datum Corporation (sample)');
    expect(result['statuscode']).to.equal(1);
    expect(
      result['statuscode@OData.Community.Display.V1.FormattedValue']
    ).to.equal('Active');
    expect(
      result[
        '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue'
      ]
    ).to.equal('Ringgit Malaysia');
    expect(
      result[
        '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty'
      ]
    ).to.equal('transactioncurrencyid');
    expect(
      result[
        '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname'
      ]
    ).to.equal('transactioncurrency');
    expect(result['_transactioncurrencyid_value']).to.equal(
      'd0d4d62d-799d-ea11-a812-000d3a80c79e'
    );
  });
});
