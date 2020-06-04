import { EntityAttributeValue } from './entity';

export type XrmAttribute<TValue extends EntityAttributeValue> =
  TValue extends string ? Xrm.Attributes.StringAttribute :
  TValue extends number ? Xrm.Attributes.NumberAttribute :
  TValue extends boolean ? Xrm.Attributes.BooleanAttribute :
  TValue extends Date ? Xrm.Attributes.DateAttribute :
  TValue extends Xrm.LookupValue[] ? Xrm.Attributes.LookupAttribute :
  Xrm.Attributes.Attribute;

export type AttributeMetadataType = 'boolean' | 'datetime' | 'customer' |
  'decimal' | 'double' | 'integer' | 'lookup' | 'memo' | 'owner' | 
  'partylist' | 'picklist' | 'state' | 'status' | 'string' | 'uniqueidentifier' |
  'calendarrules' | 'virtual' | 'bigint' | 'managedproperty' | 'entityname';

export interface AttributeMetadata {
  logicalName: string;
  schemaName: string;
  attributeType: AttributeMetadataType;
}