import { expect } from 'chai';
import 'mocha';
import { transformToEntity } from './transform-to-entity';
import { EntityMetadata } from '../definitions';

const apiResult = {
  'merged@OData.Community.Display.V1.FormattedValue': 'No',
  merged: false,
  'statecode@OData.Community.Display.V1.FormattedValue': 'Active',
  statecode: 0,
  emailaddress1: 'someone9@example.com',
  '_ownerid_value@OData.Community.Display.V1.FormattedValue': 'Some Owner',
  '_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
    'ownerid',
  '_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'systemuser',
  _ownerid_value: '02e13726-0c15-41c4-bf88-f6d9a8079725',
  'revenue@OData.Community.Display.V1.FormattedValue': 'RM10,000.00',
  revenue: 10000,
  accountid: '6193fbe8-aaa0-ea11-a812-000d3a852764',
  '_primarycontactid_value@OData.Community.Display.V1.FormattedValue':
    'Rene Valdes (sample)',
  '_primarycontactid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
    'primarycontactid',
  '_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'contact',
  _primarycontactid_value: 'c793fbe8-aaa0-ea11-a812-000d3a852764',
};

export type testEntity = {
  merged?: boolean;
  statecode?: number;
  emailaddress1?: string;
  ownerid?: Xrm.LookupValue[];
  revenue?: number;
  accountid?: string;
  primarycontactid?: Xrm.LookupValue[];
};

const metadata: EntityMetadata = {
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

describe('transformToEntity', () => {
  describe('transform API result to Entity', () => {
    it('can change API result to Entity type', () => {
      const result = transformToEntity<testEntity>(metadata, apiResult);
      expect(result.merged).to.false;
      expect(result.statecode).to.equal(0);
      expect(result.emailaddress1).to.equal('someone9@example.com');
      expect(result.ownerid[0].id).to.equal(
        '02e13726-0c15-41c4-bf88-f6d9a8079725'
      );
      expect(result.ownerid[0].entityType).to.equal('systemuser');
      expect(result.ownerid[0].name).to.equal('Some Owner');
      expect(result.revenue).to.equal(10000);
      expect(result.accountid).to.equal('6193fbe8-aaa0-ea11-a812-000d3a852764');
      expect(result.primarycontactid[0].id).to.equal(
        'c793fbe8-aaa0-ea11-a812-000d3a852764'
      );
      expect(result.primarycontactid[0].entityType).to.equal('contact');
      expect(result.primarycontactid[0].name).to.equal('Rene Valdes (sample)');
    });
  });
});
