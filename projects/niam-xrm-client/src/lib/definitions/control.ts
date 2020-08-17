import { EntityAttributeValue } from './entity';

export type XrmAttributeControl<TValue extends EntityAttributeValue> =
  TValue extends string ? Xrm.Controls.StringControl :
  TValue extends number ? Xrm.Controls.NumberControl :
  TValue extends boolean ? Xrm.Controls.StandardControl :
  TValue extends Date ? Xrm.Controls.DateControl :
  TValue extends Xrm.LookupValue[] ? Xrm.Controls.LookupControl :
  Xrm.Controls.StandardControl;

export type XrmFormRelatedControl<TV> =
  TV extends Xrm.Controls.GridControl ? Xrm.Controls.GridControl :
  TV extends Xrm.Controls.IframeControl ? Xrm.Controls.IframeControl :
  Xrm.Controls.Control;