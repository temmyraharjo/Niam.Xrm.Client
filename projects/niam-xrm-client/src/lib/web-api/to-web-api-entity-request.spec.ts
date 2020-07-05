import { expect } from 'chai';
import 'mocha';
import { toWebApiEntityRequest } from './to-web-api-entity-request';
import { EntityMetadata } from '../definitions';

export type TestEntity = {
  merged?: boolean;
  statecode?: number;
  emailaddress1?: string;
  ownerid?: Xrm.LookupValue[];
  revenue?: number;
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
      attributeType: 'lookup',
      logicalName: 'primarycontactid',
      schemaName: 'primarycontactid',
    },
  ],
};

const SYSTEMUSER_METADATA: EntityMetadata = {
  schemaName: 'systemuser',
  logicalName: 'systemuser',
  entitySetName: 'systemusers',
  attributes: [],
};

const ACCOUNT_METADATA: EntityMetadata = {
  schemaName: 'account',
  logicalName: 'account',
  entitySetName: 'accounts',
  attributes: [],
};

const METADATA_COLLECTION = [ENTITY_METADATA, SYSTEMUSER_METADATA, ACCOUNT_METADATA]

describe('web-api/to-webapi-entity-request', () => {
  const createEntity: TestEntity = {
    emailaddress1: 'me@me.com',
    merged: false,
    ownerid: [
      {
        entityType: 'systemuser',
        id: 'user-id',
        name: 'System User',
      },
    ],
    primarycontactid: [
      {
        entityType: 'account',
        id: 'primary-contact-id',
        name: 'Primary Contact',
      },
    ],
    revenue: 1000.0,
    statecode: 1,
  };

  it('can convert entity to web api object', () => {
    const webApi = toWebApiEntityRequest(METADATA_COLLECTION, 'testentity', createEntity);
    expect(webApi['emailaddress1']).to.equal('me@me.com');
    expect(webApi['merged']).to.false;
    expect(webApi['ownerid@odata.bind']).to.equal('/systemusers(user-id)');
    expect(webApi['primarycontactid@odata.bind']).to.equal(
      '/accounts(primary-contact-id)'
    );
    expect(webApi['revenue']).to.equal(1000.0);
    expect(webApi['statecode']).to.equal(1);
  });
});
