import { XrmFx } from './interfaces/xrm-fx';
import { XrmFxContext } from './interfaces/xrm-fx-context';
import { AttributeFx } from './interfaces/attribute-fx';

export class XrmFxImpl<T> implements XrmFx<T> {
constructor(public eventContext: Xrm.Events.EventContext) {}
  context: XrmFxContext;
  attributeFx: AttributeFx<T>;
}
