import * as form from './events/form';
import * as new_firstname from './events/new_firstname';
import * as new_lastname from './events/new_lastname';
import * as new_level from './events/new_level';
import * as new_superiorid from './events/new_superiorid';

export namespace new_employee {
  export const formLoaded = form.loaded;
  export const new_firstnameChanged = new_firstname.changed;
  export const new_lastnameChanged = new_lastname.changed;
  export const new_levelChanged = new_level.changed;
  export const new_superioridChanged = new_superiorid.changed;
}