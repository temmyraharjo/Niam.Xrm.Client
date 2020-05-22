import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator, EventContextMock } from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { Employee } from '../../entities';
import * as new_level from './new_level';

describe('events/new_level', () => {
  let context: EventContextMock;
  let fx: Fx<Employee>;

  before(() => {
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
    fx = new Fx<Employee>(context);
  });

  describe('when set to null', () => {
    before(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_superior' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(false);
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.set('new_level', null);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('can not change new_superiorid and new_divisionid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.true;
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
    });
  });

  describe('when set to new_level.consultant', () => {
    before(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_superior' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.set('new_level', Employee.options.new_level.consultant);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('can change new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.false;
    });

    it('can not change new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
    });
  });

  describe('when set to new_level.supervisor', () => {
    before(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_superior' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.set('new_level', Employee.options.new_level.supervisor);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('can change new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.false;
    });

    it('can not change new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
    });
  });

  describe('when set to new_level.manager', () => {
    before(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_superior' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(false);
      fx.ctrl('new_divisionid').setDisabled(true);
      fx.set('new_level', Employee.options.new_level.manager);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('can not change new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.true;
    });

    it('can change new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.false;
    });
  });
});