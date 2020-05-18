import * as form from './events/form';
import * as firstname from './events/firstname';
import * as lastname from './events/lastname';

export namespace Employee {
  export const formLoaded = form.loaded;
  export const firstnameChanged = firstname.changed;
  export const lastnameChanged = lastname.changed;
}