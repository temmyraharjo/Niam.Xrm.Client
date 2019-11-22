import { FxAttribute } from './fx-attribute';
import { FxControl } from './fx-control';

export interface FxCore {
    eventContext: Xrm.Events.EventContext;
    attributes: FxAttribute;
    controls: FxControl;
}