import { AttributeMetadata } from './attribute';

export type EntityAttributeValue = 
  number |
  string | 
  boolean |
  Date |
  Xrm.LookupValue[];

export type Entity = {
  [name: string]: EntityAttributeValue;
}

export interface EntityMetadata {
  schemaName: string;
  logicalName: string;
  entitySetName: string;
  attributes: AttributeMetadata[]
}