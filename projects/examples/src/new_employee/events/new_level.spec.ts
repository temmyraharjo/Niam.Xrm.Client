import { expect } from 'chai';
import 'mocha';
import {
  XrmMockGenerator,
  EventContextMock} from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_level from './new_level';

describe('events/new_level', () => {
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

  describe('when set to null', () => {
    beforeEach(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_employee' }]);
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
      expect(fx.attr('new_superiorid').getRequiredLevel()).to.equal('none');
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
      expect(fx.attr('new_divisionid').getRequiredLevel()).to.equal('none');
    });
  });

  describe('when set to new_level.consultant', () => {
    beforeEach(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_superior' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.set('new_level', new_employee.options.new_level.consultant);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('must set new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.false;
      expect(fx.attr('new_superiorid').getRequiredLevel()).to.equal('required');
    });

    it('can not change new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
      expect(fx.attr('new_divisionid').getRequiredLevel()).to.equal('none');
    });
  });

  describe('when set to new_level.supervisor', () => {
    beforeEach(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_employee' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(true);
      fx.ctrl('new_divisionid').setDisabled(false);
      fx.set('new_level', new_employee.options.new_level.supervisor);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('must set new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.false;
      expect(fx.attr('new_superiorid').getRequiredLevel()).to.equal('required');
    });

    it('can not change new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.true;
      expect(fx.attr('new_divisionid').getRequiredLevel()).to.equal('none');
    });
  });

  describe('when set to new_level.manager', () => {
    beforeEach(() => {
      fx.set('new_superiorid', [{ id: 'superior_id', name: 'Superior', entityType: 'new_employee' }]);
      fx.set('new_divisionid', [{ id: 'division_id', name: 'Division', entityType: 'new_division' }]);
      fx.ctrl('new_superiorid').setDisabled(false);
      fx.ctrl('new_divisionid').setDisabled(true);
      fx.set('new_level', new_employee.options.new_level.manager);
      new_level.changed(context);
    });

    it('clear new_superiorid and new_divisionid', () => {
      expect(fx.get('new_superiorid')).is.null;
      expect(fx.get('new_divisionid')).is.null;
    });

    it('can not change new_superiorid', () => {
      expect(fx.ctrl('new_superiorid').getDisabled()).is.true;
      expect(fx.attr('new_superiorid').getRequiredLevel()).to.equal('none');
    });

    it('must set new_divisionid', () => {
      expect(fx.ctrl('new_divisionid').getDisabled()).is.false;
      expect(fx.attr('new_divisionid').getRequiredLevel()).to.equal('required');
    });
  });
});