import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator, EventContextMock } from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { new_employee } from '../../entities';
import * as new_fullname from './new_fullname';

describe('events/new_fullname', () => {
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

  it('set from name concatenation', () => {
    new_fullname.setFromNameConcatenation(fx);
    expect(fx.get('new_fullname')).to.equal('FirstName LastName');
  });
});