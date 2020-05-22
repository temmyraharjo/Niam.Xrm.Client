import { createHandler, Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_level from './new_level';

export const loaded = createHandler<new_employee>(fx => {
  initUI(fx);
});

function initUI(fx: Fx<new_employee>) {
  new_level.updateUI(fx);
}
