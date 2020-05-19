import { expect } from 'chai';
import 'mocha';
import { Fx } from './fx';
import { XrmMockGenerator } from 'xrm-mock';

// https://github.com/microsoft/TypeScript/issues/32263
export type TestEntity = {
  name: string;
  age: number;
}

describe('Fx', () => {
  let context: Xrm.Events.EventContext;
  let fx: Fx<TestEntity>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createString('name', 'NAME-001');
    XrmMockGenerator.Attribute.createNumber('age', 15);

    context = XrmMockGenerator.getEventContext();
    fx = new Fx<TestEntity>(context);
  });

  it('can create Fx object', () => {
    expect(fx.context).equal(context);
  });

  describe('early-bound', () => {
    it('can get attribute value', () => {
      expect(fx.get('age')).to.equal(15);
      expect(fx.get('name')).to.equal('NAME-001');
    });

    it('can set attribute value', () => {
      fx.set('age', 10)
      expect(fx.get('age')).to.equal(10);

      fx.set('name', 'NAME-002');
      expect(fx.get('name')).to.equal('NAME-002');
    });
  });

  describe('late-bound', () => {
    let context: Xrm.Events.EventContext;
    let fx: Fx;

    beforeEach(() => {
      XrmMockGenerator.initialise();
      XrmMockGenerator.Attribute.createString('name', 'NAME-001');
      XrmMockGenerator.Attribute.createNumber('age', 15);

      context = XrmMockGenerator.getEventContext();
      fx = new Fx(context);
    });

    it('can get attribute value', () => {
      expect(fx.get('name')).to.equal('NAME-001');
      expect(fx.get('age')).to.equal(15);
    });

    it('can set attribute value', () => {
      fx.set('name', 'NAME-003');
      expect(fx.get('name')).to.equal('NAME-003');

      fx.set('age', 99);
      expect(fx.get('age')).to.equal(99);
    });
  });
});