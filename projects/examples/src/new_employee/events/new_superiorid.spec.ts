import { expect } from 'chai';
import 'mocha';
import {
  XrmMockGenerator,
  EventContextMock,
  LookupControlMock,
} from 'xrm-mock';
import * as sinon from 'sinon';
import { Fx, FxOptions } from '@niam/xrm-client';
import { new_employee, METADATA } from '../../entities';
import * as new_superiorid from './new_superiorid';

function executePreSearchsAndGetFilters(
  lookupControl: LookupControlMock,
  context: EventContextMock
) {
  lookupControl.preSearchHandlers.forEach((preSearchFn) =>
    preSearchFn(context)
  );
  return lookupControl.filters;
}

describe('events/new_superiorid', () => {
  let context: EventContextMock;
  let options: FxOptions;
  let fx: Fx<new_employee>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createOptionSet('new_level', null, [
      { value: 1, text: 'Consultant' },
      { value: 2, text: 'Supervisor' },
      { value: 3, text: 'Manager' },
    ]);
    attr.createLookup('new_superiorid', null);
    attr.createLookup('new_divisionid', null);

    context = XrmMockGenerator.getEventContext();
    options = {
      metadata: METADATA
    };
    fx = new Fx<new_employee>(context, options);
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
        expect(filters[0].filter).to.equal(
          '<filter type="and"><condition attribute="new_level" operator="eq" value="2"/></filter>'
        );
      });
    });

    describe('when new_level set to supervisior', () => {
      it('new_superiorid will show manager', () => {
        fx.set('new_level', new_employee.options.new_level.supervisor);
        const superiorCtrl = fx.ctrl<LookupControlMock>('new_superiorid');
        const filters = executePreSearchsAndGetFilters(superiorCtrl, context);
        expect(filters.length).to.equal(1);
        expect(filters[0].filter).to.equal(
          '<filter type="and"><condition attribute="new_level" operator="eq" value="3"/></filter>'
        );
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

  describe('when set new_superiorid to null', () => {
    it('set new_divisionid to null', async () => {
      fx.set('new_superiorid', null);
      fx.set('new_divisionid', [
        {
          id: 'division-id',
          name: 'Division',
          entityType: 'new_division'
        },
      ]);

      await new_superiorid.changed(context, options);
      const result: Xrm.LookupValue[] = fx.get('new_divisionid');
      expect(result).is.null;
    });
  });

  describe('when set new_superiorid to a value', () => {
    it('set new_divisionid to new_superiorid.new_divisionid', async () => {
      const data = {
        '_new_divisionid_value': 'new_superiorid.new_divisionid',
        '_new_divisionid_value@OData.Community.Display.V1.FormattedValue': 'IT Department',
        '_new_divisionid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'new_division'
      };
      sinon.stub(Xrm.WebApi, 'retrieveRecord').resolves(data);
      fx.set('new_superiorid', [
        {
          id: 'superiorid',
          name: 'Superior',
          entityType: 'new_employee',
        },
      ]);
      fx.set('new_divisionid', null);
      
      await new_superiorid.changed(context, options);
      const result: Xrm.LookupValue[] = fx.get('new_divisionid');
      expect(result.length).to.equal(1);
      expect(result[0].id).to.equal('new_superiorid.new_divisionid');
      expect(result[0].name).to.equal('IT Department');
      expect(result[0].entityType).to.equal('new_division');
    });
  });
});
