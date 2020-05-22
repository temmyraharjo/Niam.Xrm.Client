import { Entity, EntityForm } from '../definitions';
import { Fx } from '../fx';

export function createHandler<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm>(handler: (fx: Fx<TEntity, TForm>) => void):
  (context: Xrm.Events.EventContext) => void {
    return context => {
      const fx = new Fx<TEntity, TForm>(context);
      handler(fx!);
    };
}
