import * as firstnameEvent from './events/firstname';
import * as lastnameEvent from './events/firstname';

export namespace Employee {
  export function firstnameChanged(context: Xrm.Events.EventContext) {
    firstnameEvent.handle(context);
  }

  export function lastnameChanged(context: Xrm.Events.EventContext) {
    lastnameEvent.handle(context);
  }
}