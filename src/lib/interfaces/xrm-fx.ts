import { XrmFxContext } from './xrm-fx-context';
import { AttributeFx } from './attribute-fx';   
import { ControlFx } from './control-fx';

export interface XrmFx<T> {
    eventContext: Xrm.Events.EventContext
    context: XrmFxContext;
    attributeFx: AttributeFx<T>;
    controlFx: ControlFx<T>;
}