import {
  Entity,
  KeyOf,
  XrmAttributeControl,
  XrmAttribute,
  EntityForm,
  XrmFormRelatedControl,
  EntityMetadata
} from './definitions';
import { OrganizationService } from './web-api/organization-service';

export interface FxGlobal {
  metadata: EntityMetadata[];
}

const DEFAULT_FX_GLOBAL: FxGlobal = {
  metadata: []
};

export interface FxOptions {
  metadata?: EntityMetadata[];
}

export class Fx<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm> {
  constructor(public readonly context: Xrm.Events.EventContext, options?: FxOptions) {
    this._options = initFxOptions(options, Fx.global);
    this.formContext = context.getFormContext();
    this.svc = new OrganizationService(Xrm.WebApi, this._options.metadata);
  }

  static get global(): FxGlobal {
    return DEFAULT_FX_GLOBAL;
  }

  private _options: FxOptions;

  readonly formContext: Xrm.FormContext;
  readonly svc: OrganizationService;

  attr<Name extends KeyOf<TEntity>>(name: Name): XrmAttribute<TEntity[Name]>;
  attr<TAttribute extends Xrm.Attributes.Attribute>(name: KeyOf<TEntity>): TAttribute;
  attr(name: KeyOf<TEntity>): Xrm.Attributes.Attribute {
    return this.formContext.getAttribute(name);
  }

  ctrl<Name extends KeyOf<TEntity>>(name: Name): XrmAttributeControl<TEntity[Name]>;
  ctrl<Key extends KeyOf<TForm>>(name: Key): XrmFormRelatedControl<TForm[Key]>;
  ctrl<TControl extends Xrm.Controls.Control>(name: KeyOf<TEntity>): TControl
  ctrl(name: KeyOf<TEntity>): Xrm.Controls.Control {
    return this.formContext.getControl(name);
  }

  get<Attribute extends KeyOf<TEntity>, TValue extends TEntity[Attribute]>(name: Attribute): TValue;
  get<TValue extends TEntity[KeyOf<TEntity>]>(name: KeyOf<TEntity>): TValue;
  get<TValue extends TEntity[KeyOf<TEntity>]>(name: KeyOf<TEntity>): TValue {
    return this.attr(name).getValue() as TValue;
  }

  set<Attribute extends KeyOf<TEntity>, TValue extends TEntity[Attribute]>(name: Attribute, value: TValue): void;
  set(name: KeyOf<TEntity>, value: TEntity[KeyOf<TEntity>]) {
    this.attr<Xrm.Attributes.Attribute>(name).setValue(value);
  }
}

export function initFxOptions(options: FxOptions, global: FxGlobal): FxOptions {
  options = options ? { ...options } : {};
  if (!options.metadata || options.metadata.length === 0) {
    options.metadata = global.metadata;
  }

  return options;
}
