import { Entity, EntityForm } from '../definitions';
import { Fx, FxOptions } from '../fx';

export type HandlerFn = (context: Xrm.Events.EventContext, options?: FxOptions) => void;
export type HandlerPromiseFn = (context: Xrm.Events.EventContext, options?: FxOptions) => Promise<void>;

export function createHandler<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm>(
  handler: (fx: Fx<TEntity, TForm>) => Promise<void>): HandlerPromiseFn
export function createHandler<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm>(
  handler: (fx: Fx<TEntity, TForm>) => void): HandlerFn;
export function createHandler<TEntity extends Entity = Entity, TForm extends EntityForm = EntityForm>(
  handler: (fx: Fx<TEntity, TForm>) => void | Promise<void>): HandlerFn | HandlerPromiseFn {
    return (context, options) => {
      const fx = new Fx<TEntity, TForm>(context, options);
      return handler(fx!);
    };
}
