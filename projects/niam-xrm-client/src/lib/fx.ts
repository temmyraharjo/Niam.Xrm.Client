import { Entity, AttributeOf } from './definitions/index';

export class Fx<TE extends Entity = Entity> {
  constructor(public readonly context: Xrm.Events.EventContext) {
  }

  private getAtribute(name: string): Xrm.Attributes.Attribute {
    const formContext = this.context.getFormContext();
    return formContext.getAttribute(name);
  }

  get<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>): TV
  get<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute): TV
  get<TV>(name: string): TV {
    return this.getAtribute(name).getValue() as TV;
  }

  set<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>, value: TV): void
  set<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute, value: TV): void
  set<TV>(name: string, value: TV): void {
    this.getAtribute(name).setValue(value);
  }
}
