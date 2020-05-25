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
import * as sinon from 'sinon';

function executePreSearchsAndGetFilters(lookupControl: LookupControlMock,
    context: EventContextMock) {
    lookupControl.preSearchHandlers.
        forEach(preSearchFn => preSearchFn(context));
    return lookupControl.filters;
}

interface ApiEntity {
    [key: string]: string | number;
}

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
                const filters = executePreSearchsAndGetFilters(superiorCtrl, context);
                expect(filters.length).to.equal(0);
            });
        });

        describe('when new_level set to consultant', () => {
            it('new_superiorid will show supervisor', () => {
                fx.set('new_level', new_employee.options.new_level.consultant);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                const filters = executePreSearchsAndGetFilters(superiorCtrl, context);
                expect(filters.length).to.equal(1);
                expect(filters[0].filter).to.
                    equal('<filter type="and"><condition attribute="new_level" operator="eq" value="2"/></filter>');
            });
        });

        describe('when new_level set to supervisior', () => {
            it('new_superiorid will show manager', () => {
                fx.set('new_level', new_employee.options.new_level.supervisor);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                const filters = executePreSearchsAndGetFilters(superiorCtrl, context);
                expect(filters.length).to.equal(1);
                expect(filters[0].filter).to.
                    equal('<filter type="and"><condition attribute="new_level" operator="eq" value="3"/></filter>');
            });
        });

        describe('when new_level set to manager', () => {
            it('no filter applied', () => {
                fx.set('new_level', new_employee.options.new_level.manager);
                const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
                const filters = executePreSearchsAndGetFilters(superiorCtrl, context);
                expect(filters.length).to.equal(0);
            });
        });
    });

    describe('set new_divisionid', () => {
        let superiodId = 'superior-id';

        var initTestData = function (divisionid: string = '') {
            const data: ApiEntity = {};
            data['new_employeeid'] = superiodId;
            if (divisionid) {
                data['_new_divisionid_value'] = divisionid;
                data['_new_divisionid_value@OData.Community.Display.V1.FormattedValue'] = 'IT Department';
            }

            sinon.stub(Xrm.WebApi, 'retrieveRecord').resolves(data);

            fx.set('new_superiorid', [{
                id: superiodId,
                entityType: 'new_employee'
            }]);

            fx.set('new_divisionid', [{
                entityType: 'new_division',
                id: 'division-id',
                name: 'Division'
            }]);
        };

        describe('new_superior dont have new_divisionid', () => {
            it('set new_divisionid to null', () => {
                initTestData();
                new_superiorid.changed(context);
                setTimeout(() => {
                    const result: Xrm.LookupValue[] = fx.get('new_divisionid');
                    expect(result).to.null;
                }, 2000);
            });
        });

        describe('new_superior have new_divisionid', () => {
            it('set new_divisionid to new_superior.new_divisionid', () => {
                initTestData('parent-divisionid');
                new_superiorid.changed(context);
                setTimeout(() => {
                    const result: Xrm.LookupValue[] = fx.get('new_divisionid');
                    expect(result.length).to.equal(1);
                    expect(result[0].id).to.equal('parent-divisionid');
                    expect(result[0].name).to.equal('IT Department');
                }, 2000);
            });
        });
    });
});