import { Order, ORDER_METADATA } from '../src/entities';
import { BaseTest } from '../src/tests/base-test';
import { XrmFxImpl } from '../src/lib/xrm-fx-impl';
import { XrmFx } from '../src/lib/interfaces/xrm-fx';

describe('AttributeFxImpl Tests', () => {
  let baseTest: BaseTest<Order>;
  let xrmFx: XrmFx<Order>;

  beforeEach(() => {
    baseTest = new BaseTest<Order>().init(
      [
        {
          attributeName: 'date',
          isDisabled: false
        },
        {
          attributeName: 'parentId',
          isDisabled: false
        },
        {
          attributeName: 'stateCode',
          isDisabled: false
        },
        {
          attributeName: 'orderNumber',
          isDisabled: false
        },
        {
          attributeName: 'isActive',
          isDisabled: false
        }
      ],
      ORDER_METADATA
    );

    xrmFx = new XrmFxImpl<Order>(baseTest.eventContext);
  });

  it('XrmFxImpl tobe truthy', () => {
    expect(xrmFx).toBeTruthy();
    expect(xrmFx.attributeFx).toBeTruthy();
    expect(xrmFx.context).toBeTruthy();
    expect(xrmFx.context).toBeTruthy();
  });
});
