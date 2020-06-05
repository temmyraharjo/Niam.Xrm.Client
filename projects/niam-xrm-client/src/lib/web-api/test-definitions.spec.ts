import 'mocha';
import { EntityMetadata } from '../definitions';

export type TestEntity = {
  id?: string;
  name?: string;
  age?: number;
  date?: Date;
  bool?: boolean;
  lookupid?: Xrm.LookupValue[];
  options?: number;
}

export const ENTITY_METADATA: EntityMetadata = {
  schemaName: 'testentity',
  entitySetName: 'testentities',
  logicalName: 'testentity',
  attributes: [
    {
      attributeType: 'uniqueidentifier',
      logicalName: 'id',
      schemaName: 'id',
    },
    {
      attributeType: 'string',
      logicalName: 'name',
      schemaName: 'name',
    },
    {
      attributeType: 'integer',
      logicalName: 'age',
      schemaName: 'age',
    },
    {
      attributeType: 'datetime',
      logicalName: 'date',
      schemaName: 'date',
    },
    {
      attributeType: 'boolean',
      logicalName: 'bool',
      schemaName: 'bool',
    },
    {
      attributeType: 'lookup',
      logicalName: 'lookupid',
      schemaName: 'lookupid',
    },
    {
      attributeType: 'picklist',
      logicalName: 'options',
      schemaName: 'options',
    }
  ],
};
