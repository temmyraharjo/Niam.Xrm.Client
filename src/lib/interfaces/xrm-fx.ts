import { XrmFxContext } from './xrm-fx-context';
import { AttributeFx } from './attribute-fx';   

export interface XrmFx<T> {
    eventContext: Xrm.Events.EventContext
    context: XrmFxContext;
    attributeFx: AttributeFx<T>;
}