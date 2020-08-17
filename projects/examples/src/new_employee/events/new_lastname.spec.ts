import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator, EventContextMock } from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_lastname from './new_lastname';

describe('events/new_lastname', () => {
  let context: EventContextMock;
  let fx: Fx<new_employee>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createString('new_firstname', 'FirstName');
    attr.createString('new_lastname', 'LastName');
    attr.createString('new_fullname', '');
    context = XrmMockGenerator.getEventContext();
    fx = new Fx<new_employee>(context);
  });

  describe('when set to any', () => {
    beforeEach(() => {
      fx.set('new_firstname', 'FirstName');
      fx.set('new_lastname', 'LastName');
    })

    it('set fullname', () => {
      new_lastname.changed(context);
      expect(fx.get('new_fullname')).to.equal('FirstName LastName');
    });
  });
});