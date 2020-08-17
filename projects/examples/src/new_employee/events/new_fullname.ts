import { Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';

export function setFromNameConcatenation(fx: Fx<new_employee>) {
  const firstname = fx.get('new_firstname');
  const lastname = fx.get('new_lastname');
  const fullname = `${firstname ?? ''} ${lastname ?? ''}`.trim();
  fx.set('new_fullname', fullname);
}