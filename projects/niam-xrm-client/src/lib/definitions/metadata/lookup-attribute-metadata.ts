import { AttributeMetadata } from './attribute-metadata';

export interface LookupAttributeMetadata extends AttributeMetadata {
  attributeType: 'lookup';
}