import { Fx, createHandler } from '@niam/xrm-client';
import { new_employee } from '../../entities';

const LEVEL_FILTER = {
  [new_employee.options.new_level.consultant]: new_employee.options.new_level.supervisor,
  [new_employee.options.new_level.supervisor]: new_employee.options.new_level.manager
}

const PRE_SEARCH_HANDLER = createHandler<new_employee>((fx) => {
  const level = fx.get('new_level');
  if (!level) { return; }

  const levelFilter = LEVEL_FILTER[level];
  if (!levelFilter) { return; }

  const filter = [
    '<filter type="and">',
      `<condition attribute="new_level" operator="eq" value="${levelFilter}"/>`,
    '</filter>',
  ].join('');

  fx.ctrl('new_superiorid').addCustomFilter(filter);
});

export function initPreSearch(fx: Fx<new_employee>) {
  fx.ctrl('new_superiorid').addPreSearch(PRE_SEARCH_HANDLER);
}

export const changed = createHandler<new_employee>(async (fx) => {
  fx.set('new_divisionid', null);

  const superiorRef = fx.get('new_superiorid');
  if (!superiorRef) return;

  const superior = await fx.svc.retrieve<new_employee>(superiorRef, ['new_divisionid']);
  fx.set('new_divisionid', superior.new_divisionid);
});
