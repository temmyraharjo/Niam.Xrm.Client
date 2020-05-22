import { Fx, createHandler } from '@niam/xrm-client';
import { new_employee } from '../../entities';

const preSearchHandler = createHandler<new_employee>(fx => {
    const level: number = fx.get('new_level');
    if (!level) return;

    const valid = level === new_employee.options.new_level.consultant
        || level === new_employee.options.new_level.supervisor;
    if (!valid) return;

    const mappingLevel = level ===
        new_employee.options.new_level.consultant ?
        new_employee.options.new_level.supervisor :
        new_employee.options.new_level.manager;

    const filter = [
        '<filter type="and">',
        '<condition attribute="new_level" operator="eq" value="'
        + mappingLevel + '"/>',
        '</filter>'
    ].join('');

    fx.ctrl('new_superiorid').addCustomFilter(filter);
});

export function initPreSearch(fx: Fx<new_employee>) {
    fx.ctrl('new_superiorid').addPreSearch(preSearchHandler);
}