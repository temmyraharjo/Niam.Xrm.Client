import { createHandler } from '@niam/xrm-client';
import { Employee } from '../../entities';

export const changed = createHandler<Employee>(fx => {
  fx.set('new_superiorid', null);
  fx.set('new_divisionid', null);

  const level = fx.get('new_level');
  if (level) {
    if (level === Employee.options.new_level.manager) {
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.ctrl('new_divisionid').setDisabled(false);
    } else {
      fx.ctrl('new_superiorid').setDisabled(false);
      fx.ctrl('new_divisionid').setDisabled(true);
    }
  } else {
    fx.ctrl('new_superiorid').setDisabled(true);
    fx.ctrl('new_divisionid').setDisabled(true);
  }
});
