import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator, EventContextMock } from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { Employee } from '../../entities';
import * as new_firstname from './new_firstname';

describe('events/new_firstname', () => {
  let context: EventContextMock;
  let fx: Fx<Employee>;

  before(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createString('new_firstname');
    attr.createString('new_lastname');
    attr.createString('new_fullname');
    context = XrmMockGenerator.getEventContext();
    fx = new Fx<Employee>(context);
  });

  describe('when set to any', () => {
    before(() => {
      fx.set('new_firstname', 'FirstName');
      fx.set('new_lastname', 'LastName');
    })

    it('set fullname', () => {
      new_firstname.changed(context);
      expect(fx.get('new_fullname')).to.equal('FirstName LastName');
    });
  });
});