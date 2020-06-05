import { expect } from 'chai';
import 'mocha';
import { toEntity } from './to-entity';
import { EntityMetadata } from '../definitions';

export type TestEntity = {
  merged?: boolean;
  statecode?: number;
  emailaddress1?: string;
  ownerid?: Xrm.LookupValue[];
  revenue?: number;
  accountid?: string;
  primarycontactid?: Xrm.LookupValue[];
};

const ENTITY_METADATA: EntityMetadata = {
  logicalName: 'testentity',
  schemaName: 'testentity',
  entitySetName: 'testentities',
  attributes: [
    {
      attributeType: 'boolean',
      logicalName: 'merged',
      schemaName: 'merged',
    },
    {
      attributeType: 'picklist',
      logicalName: 'statecode',
      schemaName: 'statecode',
    },
    {
      attributeType: 'string',
      logicalName: 'emailaddress1',
      schemaName: 'emailaddress1',
    },
    {
      attributeType: 'owner',
      logicalName: 'ownerid',
      schemaName: 'ownerid',
    },
    {
      attributeType: 'decimal',
      logicalName: 'revenue',
      schemaName: 'revenue',
    },
    {
      attributeType: 'uniqueidentifier',
      logicalName: 'accountid',
      schemaName: 'accountid',
    },
    {
      attributeType: 'lookup',
      logicalName: 'primarycontactid',
      schemaName: 'primarycontactid',
    },
  ],
};

describe('web-api/to-entity', () => {
  const WEB_API_RETRIEVE_RESPONSE = {
    'merged@OData.Community.Display.V1.FormattedValue': 'No',
    'merged': false,

    'statecode@OData.Community.Display.V1.FormattedValue': 'Active',
    'statecode': 0,
    
    'emailaddress1': 'someone9@example.com',

    '_ownerid_value@OData.Community.Display.V1.FormattedValue': 'Some Owner',
    '_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty': 'ownerid',
    '_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'systemuser',
    '_ownerid_value': '02e13726-0c15-41c4-bf88-f6d9a8079725',

    'revenue@OData.Community.Display.V1.FormattedValue': 'RM10,000.00',
    'revenue': 10000,
    
    'accountid': '6193fbe8-aaa0-ea11-a812-000d3a852764',

    '_primarycontactid_value@OData.Community.Display.V1.FormattedValue': 'Rene Valdes (sample)',
    '_primarycontactid_value@Microsoft.Dynamics.CRM.associatednavigationproperty': 'primarycontactid',
    '_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'contact',
    '_primarycontactid_value': 'c793fbe8-aaa0-ea11-a812-000d3a852764',
  };

  it('can convert web api retrieve response to entity', () => {
    const entity = toEntity<TestEntity>(ENTITY_METADATA, WEB_API_RETRIEVE_RESPONSE);
    expect(entity.merged).is.false;
    expect(entity.statecode).to.equal(0);
    expect(entity.emailaddress1).to.equal('someone9@example.com');
    expect(entity.ownerid[0].id).to.equal('02e13726-0c15-41c4-bf88-f6d9a8079725');
    expect(entity.ownerid[0].entityType).to.equal('systemuser');
    expect(entity.ownerid[0].name).to.equal('Some Owner');
    expect(entity.revenue).to.equal(10000);
    expect(entity.accountid).to.equal('6193fbe8-aaa0-ea11-a812-000d3a852764');
    expect(entity.primarycontactid[0].id).to.equal('c793fbe8-aaa0-ea11-a812-000d3a852764');
    expect(entity.primarycontactid[0].entityType).to.equal('contact');
    expect(entity.primarycontactid[0].name).to.equal('Rene Valdes (sample)');
  });
});
