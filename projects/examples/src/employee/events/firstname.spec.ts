import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator, EventContextMock } from 'xrm-mock';
import { Fx } from '@niam/xrm-client';
import { Employee } from '../../entities';
import * as firstname from './firstname';

describe('events/firstname', () => {
  let context: EventContextMock;
  let fx: Fx<Employee>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createString('new_firstname', 'FirstName');
    attr.createString('new_lastname', 'LastName');
    attr.createString('new_fullname', '');
    context = XrmMockGenerator.getEventContext();
    fx = new Fx<Employee>(context);
  });

  it('set fullname on change', () => {
    firstname.changed(context);
    expect(fx.get('new_fullname')).to.equal('FirstName LastName');
  });
});