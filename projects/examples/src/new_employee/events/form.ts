import { Fx, executeOnce } from '@niam/xrm-client';
import { new_employee, METADATA } from '../../entities';
import * as new_level from './new_level';
import * as new_superiorid from './new_superiorid'

export function loaded(context: Xrm.Events.EventContext) {
  Fx.global.metadata = METADATA;
  const fx = new Fx<new_employee>(context);
  new_level.updateUI(fx);
  initPreSearch(fx);
}

const initPreSearch = executeOnce((fx: Fx<new_employee>) => {
  new_superiorid.initPreSearch(fx);
})