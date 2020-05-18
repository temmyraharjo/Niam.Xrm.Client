import { createHandler } from '@niam/xrm-client';
import { Employee } from '../../entities';

export const changed = createHandler<Employee>(fx => {
  const firstname = fx.get('new_firstname');
  const lastname = fx.get('new_lastname');
  const fullname = `${firstname ?? ''} ${lastname ?? ''}`.trim();
  fx.set('new_fullname', fullname);
});
