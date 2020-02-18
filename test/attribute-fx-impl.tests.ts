import { AttributeFxImpl } from '../src/lib/attribute-fx-impl';
import { Order, ORDER_METADATA } from '../src/entities';
import { BaseTest } from '../src/tests/base-test';
import { AttributeFx } from '../src/lib/interfaces/attribute-fx';

describe('AttributeFxImpl Tests', () => {
  let baseTest: BaseTest<Order>;
  let attributeFx: AttributeFx<Order>;

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

    attributeFx = new AttributeFxImpl<Order>(baseTest.context);
  });

  it('AttributeFxImpl set and get', () => {
    const date = new Date();
    attributeFx.set('date', date);

    const dateValue = attributeFx.get('date');
    expect(dateValue).toEqual(date);

    const lookupValue = {
      id: 'THIS-IS-GUID',
      name: 'PARENT',
      entityType: 'PARENT-ENTITY'
    };
    attributeFx.set('parentId', lookupValue);
    const parentRef = attributeFx.get('parentId') as Xrm.LookupValue;
    expect(parentRef.id).toEqual(lookupValue.id);

    const optionSetValue = {
      value: 1,
      text: 'ACTIVE'
    };
    attributeFx.set('stateCode', optionSetValue);
    const stateRef = attributeFx.get('stateCode') as Xrm.OptionSetValue;
    expect(stateRef.value).toEqual(optionSetValue.value);

    attributeFx.set('orderNumber', 'ORDER-001');
    const orderNumberValue = attributeFx.get('orderNumber');
    expect(orderNumberValue).toEqual('ORDER-001');

    attributeFx.set('isActive', true);
    expect(attributeFx.get('isActive')).toBeTruthy();
  });
});
