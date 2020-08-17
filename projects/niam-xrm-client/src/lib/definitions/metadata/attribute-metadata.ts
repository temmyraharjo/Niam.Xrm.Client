export type AttributeMetadataType = 'boolean' | 'datetime' | 'customer' |
  'decimal' | 'double' | 'integer' | 'lookup' | 'memo' | 'owner' | 
  'partylist' | 'picklist' | 'state' | 'status' | 'string' | 'uniqueidentifier' |
  'calendarrules' | 'virtual' | 'bigint' | 'managedproperty' | 'entityname';

export interface AttributeMetadata {
  attributeType: AttributeMetadataType;
  logicalName: string;
  schemaName: string;
}