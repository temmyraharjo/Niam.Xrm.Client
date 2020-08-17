import { expect } from 'chai';
import 'mocha';
import { XrmMockGenerator } from 'xrm-mock';
import { createHandler } from './create-handler';

export type TestEntity = {
  first?: number;
  second?: number;
  total?: number;
}

describe('utils/create-handler', () => {
  let context: Xrm.Events.EventContext;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createNumber('first', 15);
    attr.createNumber('second', 17);
    attr.createNumber('total', 0);

    context = XrmMockGenerator.getEventContext();
  });

  it('can create handler', () => {
    const handler = createHandler<TestEntity>(fx => {
      const first = fx.get('first') ?? 0;
      const second = fx.get('second') ?? 0;
      fx.set('total', first + second);
    });
    handler(context);
    const actual = XrmMockGenerator.formContext.getAttribute('total').getValue();
    expect(actual).to.equal(32);
  });

  it('can create async handler', async () => {
    const handler = createHandler<TestEntity>(fx => {
      return new Promise(resolve => {
        setTimeout(() => {
          const first = fx.get('first') ?? 0;
          const second = fx.get('second') ?? 0;
          fx.set('total', first + second);
          resolve();
        }, 50);
      });
    });
    await handler(context);
    const actual = XrmMockGenerator.formContext.getAttribute('total').getValue();
    expect(actual).to.equal(32);
  });
});