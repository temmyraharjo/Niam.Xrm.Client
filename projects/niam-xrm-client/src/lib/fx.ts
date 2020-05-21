import {
  Entity,
  KeyOf,
  XrmAttributeControl,
  XrmAttribute,
  EntityForm,
  XrmFormRelatedControl
} from './definitions';

export class Fx<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm> {
  constructor(public readonly context: Xrm.Events.EventContext) {
  }

  private _formContext: Xrm.FormContext = null;

  get formContext(): Xrm.FormContext {
    if (!this._formContext) {
      this._formContext = this.context.getFormContext();
    }

    return this._formContext;
  }

  attr<Name extends KeyOf<TEntity>>(name: Name): XrmAttribute<TEntity[Name]>
  attr<TAttribute extends Xrm.Attributes.Attribute>(name: KeyOf<TEntity>): TAttribute
  attr(name: KeyOf<TEntity>): Xrm.Attributes.Attribute {
    return this.formContext.getAttribute(name);
  }

  ctrl<Name extends KeyOf<TEntity>>(name: Name): XrmAttributeControl<TEntity[Name]>
  ctrl<Key extends KeyOf<TForm>>(name: Key): XrmFormRelatedControl<TForm[Key]>
  ctrl<TControl extends Xrm.Controls.Control>(name: KeyOf<TEntity>): TControl
  ctrl(name: KeyOf<TEntity>): Xrm.Controls.Control {
    return this.formContext.getControl(name);
  }

  get<TValue extends TEntity[KeyOf<TEntity>]>(name: KeyOf<TEntity>): TValue
  get<Attribute extends KeyOf<TEntity>, TValue extends TEntity[Attribute]>(name: Attribute): TValue {
    return this.attr(name).getValue() as TValue;
  }

  set<TValue extends TEntity[KeyOf<TEntity>]>(name: KeyOf<TEntity>, value: TValue): void
  set<Attribute extends KeyOf<TEntity>, TValue extends TEntity[Attribute]>(name: Attribute, value: TValue): void
  set(name: KeyOf<TEntity>, value: TEntity[KeyOf<TEntity>]) {
    this.attr<Xrm.Attributes.Attribute>(name).setValue(value);
  }
}
