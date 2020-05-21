import { Entity, AttributeOf } from './definitions/index';
import { XrmAttributeControl } from './definitions/control';

export type AttributeType<TV> =
  TV extends string ? Xrm.Attributes.StringAttribute :
  TV extends number ? Xrm.Attributes.NumberAttribute :
  TV extends boolean ? Xrm.Attributes.BooleanAttribute :
  TV extends Date ? Xrm.Attributes.DateAttribute :
  TV extends Xrm.LookupValue[] ? Xrm.Attributes.LookupAttribute :
  Xrm.Attributes.Attribute;

export type OptionSetAttribute = Xrm.Attributes.OptionSetAttribute;

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

  ctrl<T extends Xrm.Controls.StringControl>(name: AttributeOf<TE>): Xrm.Controls.StringControl
  ctrl<T extends Xrm.Controls.NumberControl>(name: AttributeOf<TE>): Xrm.Controls.NumberControl
  ctrl<T extends Xrm.Controls.StandardControl>(name: AttributeOf<TE>): Xrm.Controls.StandardControl
  ctrl<T extends Xrm.Controls.DateControl>(name: AttributeOf<TE>): Xrm.Controls.DateControl
  ctrl<T extends Xrm.Controls.LookupControl>(name: AttributeOf<TE>): Xrm.Controls.LookupControl
  ctrl<T extends Xrm.Controls.IframeControl>(name: AttributeOf<TE>): Xrm.Controls.IframeControl
  ctrl<T extends Xrm.Controls.GridControl>(name: AttributeOf<TE>): Xrm.Controls.GridControl
  ctrl<T extends Xrm.Controls.FramedControl>(name: AttributeOf<TE>): Xrm.Controls.FramedControl
  ctrl<T extends Xrm.Controls.QuickFormControl>(name: AttributeOf<TE>): Xrm.Controls.QuickFormControl
  ctrl<T extends Xrm.Controls.OptionSetControl>(name: AttributeOf<TE>): Xrm.Controls.OptionSetControl
  ctrl<T extends Xrm.Controls.AutoLookupControl>(name: AttributeOf<TE>): Xrm.Controls.AutoLookupControl
  ctrl<T extends Xrm.Controls.SilverlightControl>(name: AttributeOf<TE>): Xrm.Controls.SilverlightControl
  ctrl<Attribute extends AttributeOf<TE>>(name: Attribute): XrmAttributeControl<TE[Attribute]>
  ctrl(name: string): Xrm.Controls.Control {
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
