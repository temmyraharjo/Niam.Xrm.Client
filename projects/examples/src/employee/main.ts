import * as form from './events/form';
import * as new_firstname from './events/new_firstname';
import * as new_lastname from './events/new_lastname';

export namespace Employee {
  export const formLoaded = form.loaded;
  export const new_firstnameChanged = new_firstname.changed;
  export const new_lastnameChanged = new_lastname.changed;
}