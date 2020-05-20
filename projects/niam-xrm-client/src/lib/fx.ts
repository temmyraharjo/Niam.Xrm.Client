import { Entity, AttributeOf } from './definitions/index';

export type AttributeType<TV> =
  TV extends string ? Xrm.Attributes.StringAttribute :
  TV extends number ? Xrm.Attributes.NumberAttribute :
  TV extends boolean ? Xrm.Attributes.BooleanAttribute :
  TV extends Date ? Xrm.Attributes.DateAttribute :
  TV extends Xrm.LookupValue[] ? Xrm.Attributes.LookupAttribute :
  Xrm.Attributes.Attribute;

export type OptionSetAttribute = Xrm.Attributes.OptionSetAttribute;

export type ControlType<TV> =
  TV extends string ? Xrm.Controls.StringControl :
  TV extends number ? Xrm.Controls.NumberControl :
  TV extends boolean ? Xrm.Controls.StandardControl :
  TV extends Date ? Xrm.Controls.DateControl :
  TV extends Xrm.LookupValue[] ? Xrm.Controls.LookupControl :
  Xrm.Controls.StandardControl;

export class Fx<TE extends Entity = Entity> {
  constructor(public readonly context: Xrm.Events.EventContext) {
  }

  private _formContext: Xrm.FormContext | null = null;

  get formContext(): Xrm.FormContext {
    if (!this._formContext) {
      this._formContext = this.context.getFormContext();
    }

    return this._formContext;
  }

  attr<Attribute extends AttributeOf<TE>>(name: Attribute): AttributeType<TE[Attribute]>
  attr<TA extends Xrm.Attributes.Attribute = Xrm.Attributes.Attribute>(name: AttributeOf<TE>): TA {
    return this.formContext.getAttribute(name);
  }

  ctrl<Attribute extends AttributeOf<TE>>(name: Attribute): ControlType<TE[Attribute]> {
    return this.formContext.getControl(name);
  }

  get<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>): TV
  get<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute): TV {
    return this.attr<Attribute>(name).getValue() as TV;
  }

  set<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>, value: TV): void
  set<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute, value: TV): void
  set(name: AttributeOf<TE>, value: TE[AttributeOf<TE>]) {
    (this.attr(name) as Xrm.Attributes.Attribute).setValue(value);
  }
}
