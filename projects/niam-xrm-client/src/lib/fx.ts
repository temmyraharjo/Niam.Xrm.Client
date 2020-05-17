import { Entity, AttributeOf } from './definitions/index';

export class Fx<TE extends Entity = Entity> {
  constructor(public readonly context: Xrm.Events.EventContext) {
  }
  
  get<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>): TV
  get<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute): TV
  get<TV>(name: string): TV {
    throw new Error();
  }

  set<TV extends TE[AttributeOf<TE>]>(name: AttributeOf<TE>, value: TV): TV
  set<Attribute extends AttributeOf<TE>, TV extends TE[Attribute]>(name: Attribute, value: TV): TV
  set<TV>(name: string, value: TV): TV {
    throw new Error();
  }
}
