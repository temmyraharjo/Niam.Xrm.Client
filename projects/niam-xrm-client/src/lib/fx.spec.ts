import { expect } from 'chai';
import 'mocha';
import { Fx } from './fx';

// https://github.com/microsoft/TypeScript/issues/32263
export type TestEntity = {
  name: string;
  age: number;
}

describe('Fx', () => {
  it('can create Fx object', () => {
    const context = {
    } as Xrm.Events.EventContext;
    const fx = new Fx(context);
    expect(fx.context).equal(context);
  });

  describe('early-bound', () => {
    it('can get attribute value', () => {
      const context = {
  
      } as Xrm.Events.EventContext;
      const fx = new Fx<TestEntity>(context);
      
      fx.get('age');
      fx.set('age', 1234);
    });
  });

  describe('late-bound', () => {
    it('can get attribute value', () => {
      const context = {
  
      } as Xrm.Events.EventContext;
      const fx = new Fx(context);
      
      fx.get<number>('age');
      fx.set('age', 1234);
    });
  });
});