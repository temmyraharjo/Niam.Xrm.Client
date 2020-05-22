import { expect } from 'chai';
import 'mocha';
import {
    XrmMockGenerator,
    EventContextMock,
    LookupControlMock
} from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as  new_superiorid from './new_superiorid';

describe('events/new_superiorid', () => {
    let context: EventContextMock;
    let fx: Fx<new_employee>;

    beforeEach(() => {
        XrmMockGenerator.initialise();
        const attr = XrmMockGenerator.Attribute;
        attr.createOptionSet('new_level', null, [
            { value: 1, text: 'Consultant' },
            { value: 2, text: 'Supervisor' },
            { value: 3, text: 'Manager' }
        ]);
        attr.createLookup('new_superiorid', null);
        attr.createLookup('new_divisionid', null);

        context = XrmMockGenerator.getEventContext();
        fx = new Fx<new_employee>(context);
    });

    describe('registerPreSearch', () => {
        beforeEach(() => {
            new_superiorid.initPreSearch(fx);
        });

        describe('when new_level set to null', () => {
            it('no filter applied', () => {
                fx.set('new_level', null);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                expect(superiorCtrl.preSearchHandlers.length).to.equal(1);
                const preSearchFn = superiorCtrl.preSearchHandlers[0];
                preSearchFn(context);
                expect(superiorCtrl.filters.length).to.equal(0);
            });
        });

        describe('when new_level set to consultant', () => {
            it('new_superiorid will show supervisor', () => {
                fx.set('new_level', new_employee.options.new_level.consultant);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                expect(superiorCtrl.preSearchHandlers.length).to.equal(1);
                const preSearchFn = superiorCtrl.preSearchHandlers[0];
                preSearchFn(context);
                expect(superiorCtrl.filters.length).to.equal(1);
                const filterText = superiorCtrl.filters[0].filter;
                expect(filterText).to.
                    equal('<filter type="and"><condition attribute="new_level" operator="eq" value="2"/></filter>');
            });
        });

        describe('when new_level set to supervisior', () => {
            it('new_superiorid will show manager', () => {
                fx.set('new_level', new_employee.options.new_level.supervisor);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                expect(superiorCtrl.preSearchHandlers.length).to.equal(1);
                const preSearchFn = superiorCtrl.preSearchHandlers[0];
                preSearchFn(context);
                expect(superiorCtrl.filters.length).to.equal(1);
                const filterText = superiorCtrl.filters[0].filter;
                expect(filterText).to.
                    equal('<filter type="and"><condition attribute="new_level" operator="eq" value="3"/></filter>');
            });
        });

        describe('when new_level set to manager', () => {
            it('no filter applied', () => {
                fx.set('new_level', new_employee.options.new_level.manager);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                expect(superiorCtrl.preSearchHandlers.length).to.equal(1);
                const preSearchFn = superiorCtrl.preSearchHandlers[0];
                preSearchFn(context);
                expect(superiorCtrl.filters.length).to.equal(0);
            });
        });
    });
});