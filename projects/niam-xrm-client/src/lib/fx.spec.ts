import { expect } from 'chai';
import 'mocha';
import { Fx } from './fx';
import { XrmMockGenerator } from 'xrm-mock';

// https://github.com/microsoft/TypeScript/issues/32263
export type TestEntity = {
  name?: string;
  age?: number;
  date?: Date;
  bool?: boolean;
  lookupid?: Xrm.LookupValue[];
  options?: number;
}

describe('Fx', () => {
  let context: Xrm.Events.EventContext;
  let fx: Fx<TestEntity>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createString('name', 'NAME-001');
    attr.createNumber('age', 15);
    attr.createDate('date', new Date(2020, 1, 2));
    attr.createBoolean('bool', true);
    attr.createLookup('lookupid', [{ id: 'my-id', name: 'LookupName', entityType: '1234' }]);
    attr.createOptionSet('options', 2);

    const ctrl = XrmMockGenerator.Control;
    ctrl.createGrid('gridctrl');

    context = XrmMockGenerator.getEventContext();
    fx = new Fx<TestEntity>(context);
  });

  it('can create Fx object', () => {
    expect(fx.context).equal(context);
  });

  describe('early-bound', () => {
    it('can get attribute value', () => {
      const age: number = fx.get('age');
      const name: string = fx.get('name');
      const date: Date = fx.get('date');
      const bool: boolean = fx.get('bool');
      const lookupid: Xrm.LookupValue[] = fx.get('lookupid');
      const options: number = fx.get('options');

      expect(age).to.equal(15);
      expect(name).to.equal('NAME-001');
      expect(date).to.deep.equal(new Date(2020, 1, 2));
      expect(bool).to.equal(true);
      expect(lookupid).to.deep.equal([{ id: 'my-id', name: 'LookupName', entityType: '1234' }]);
      expect(options).to.equal(2);
    });

    it('can set attribute value', () => {
      fx.set('age', 10);
      const age: number = fx.get('age');
      expect(age).to.equal(10);

      fx.set('name', 'NAME-002');
      const name: string = fx.get('name');
      expect(name).to.equal('NAME-002');
    });

    it('can get control', () => {
      expect(fx.ctrl('name')).to.not.null;
      expect(fx.ctrl('lookupid')).to.not.null;
      expect(fx.ctrl('age')).to.not.null;
      expect(fx.ctrl('bool')).to.not.null;
      expect(fx.ctrl('options')).to.not.null;
    });
  });

  describe('late-bound', () => {
    let fx: Fx;

    beforeEach(() => {
      fx = new Fx(context);
    });

    it('can get attribute value', () => {
      expect(fx.get<string>('name')).to.equal('NAME-001');
      expect(fx.get<number>('age')).to.equal(15);
    });

    it('can set attribute value', () => {
      fx.set('name', 'NAME-003');
      expect(fx.get<string>('name')).to.equal('NAME-003');

      fx.set('age', 99);
      expect(fx.get<number>('age')).to.equal(99);
    });

    it('can get control', () => {
      expect(fx.ctrl<Xrm.Controls.NumberControl>('name')).to.not.null;
      expect(fx.ctrl<Xrm.Controls.LookupControl>('lookupid')).to.not.null;
      expect(fx.ctrl<Xrm.Controls.NumberControl>('age')).to.not.null;
      expect(fx.ctrl<Xrm.Controls.StandardControl>('bool')).to.not.null;
      expect(fx.ctrl<Xrm.Controls.OptionSetControl>('options')).to.not.null;
      expect(fx.ctrl<Xrm.Controls.GridControl>('gridctrl')).to.not.null;
    });
  });
});