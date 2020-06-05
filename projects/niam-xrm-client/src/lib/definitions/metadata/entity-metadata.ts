import { AttributeMetadata } from './attribute-metadata';
import { LookupAttributeMetadata } from './lookup-attribute-metadata';
import { OwnerAttributeMetadata } from './owner-attribute-metadata';

export type AttributeMetadataDef =
  LookupAttributeMetadata |
  OwnerAttributeMetadata |
  AttributeMetadata

export interface EntityMetadata {
  schemaName: string;
  logicalName: string;
  entitySetName: string;
  attributes: AttributeMetadataDef[]
}