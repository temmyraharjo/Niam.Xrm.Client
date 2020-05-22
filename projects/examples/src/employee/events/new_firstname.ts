import { createHandler } from '@niam/xrm-client';
import { Employee } from '../../entities';
import * as new_fullname from './new_fullname';

export const changed = createHandler<Employee>(fx => {
  new_fullname.setFromNameConcatenation(fx);
});
