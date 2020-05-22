import { createHandler, Fx, executeOnce } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_level from './new_level';
import * as new_superiorid from './new_superiorid'

export const loaded = createHandler<new_employee>(fx => {
  new_level.updateUI(fx);
  initPreSearch(fx);
});

const initPreSearch = executeOnce((fx: Fx<new_employee>) => {
  new_superiorid.initPreSearch(fx);
})