import { Fx } from '@niam/xrm-client';
import { Employee } from '../../entities';

export function setFromNameConcatenation(fx: Fx<Employee>) {
  const firstname = fx.get('new_firstname');
  const lastname = fx.get('new_lastname');
  const fullname = `${firstname ?? ''} ${lastname ?? ''}`.trim();
  fx.set('new_fullname', fullname);
}