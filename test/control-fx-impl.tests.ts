import { ControlFxImpl } from '../src/lib/control-fx-impl';
import { Order, ORDER_METADATA } from '../src/entities';
import { BaseTest } from '../src/tests/base-test';
import { ControlFx } from '../src/lib/interfaces/control-fx';

describe('AttributeFxImpl Tests', () => {
  let baseTest: BaseTest<Order>;
  let controlFx: ControlFx<Order>;

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

    controlFx = new ControlFxImpl<Order>(baseTest.context);
  });

  it('AttributeFxImpl set and get', () => {
    controlFx.setDisabled('date', true);
    expect(controlFx.getDisabled('date')).toBeTruthy();

    controlFx.setDisabled('parentId', true);
    expect(controlFx.getDisabled('parentId')).toBeTruthy();

    controlFx.setDisabled('stateCode', true);
    expect(controlFx.getDisabled('stateCode')).toBeTruthy();
   
    controlFx.setDisabled('orderNumber', true);
    expect(controlFx.getDisabled('orderNumber')).toBeTruthy();
   
    controlFx.setDisabled('isActive', true);
    expect(controlFx.getDisabled('isActive')).toBeTruthy();
  });
});
