import { EntityAttributeValue } from './entity';

export type XrmAttribute<TValue extends EntityAttributeValue> =
  TValue extends string ? Xrm.Attributes.StringAttribute :
  TValue extends number ? Xrm.Attributes.NumberAttribute :
  TValue extends boolean ? Xrm.Attributes.BooleanAttribute :
  TValue extends Date ? Xrm.Attributes.DateAttribute :
  TValue extends Xrm.LookupValue[] ? Xrm.Attributes.LookupAttribute :
  Xrm.Attributes.Attribute;
