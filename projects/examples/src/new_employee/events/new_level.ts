import { createHandler, Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';

export const changed = createHandler<new_employee>(fx => {
  fx.set('new_superiorid', null);
  fx.set('new_divisionid', null);
  updateUI(fx);
});

export function updateUI(fx: Fx<new_employee>) {
  const level = fx.get('new_level');
  if (level) {
    if (level === new_employee.options.new_level.manager) {
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.attr('new_superiorid').setRequiredLevel('none');
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.attr('new_divisionid').setRequiredLevel('required');
    } else {
      fx.ctrl('new_superiorid').setDisabled(false);
      fx.attr('new_superiorid').setRequiredLevel('required');
      fx.ctrl('new_divisionid').setDisabled(true);
      fx.attr('new_divisionid').setRequiredLevel('none');
    }
  } else {
    fx.ctrl('new_superiorid').setDisabled(true);
    fx.attr('new_superiorid').setRequiredLevel('none');
    fx.ctrl('new_divisionid').setDisabled(true);
    fx.attr('new_divisionid').setRequiredLevel('none');
  }
}