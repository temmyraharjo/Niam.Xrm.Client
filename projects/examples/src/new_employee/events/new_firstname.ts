import { createHandler } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_fullname from './new_fullname';

export const changed = createHandler<new_employee>(fx => {
  new_fullname.setFromNameConcatenation(fx);
});
