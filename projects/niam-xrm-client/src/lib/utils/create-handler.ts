import { Entity } from '../definitions';
import { Fx } from '../fx';

export function createHandler<TE extends Entity = Entity>(handler: (fx: Fx<TE>) => void): (context: Xrm.Events.EventContext) => void {
  return context => {
    const fx = new Fx<TE>(context);
    handler(fx!);
  };
}
