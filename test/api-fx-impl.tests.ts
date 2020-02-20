import { BaseTest, FakeTestEntity } from '../src/tests/base-test';
import { Order, ORDER_METADATA } from '../src/entities';
import { ApiFx } from '../src/lib/interfaces/api-fx';
import { ApiFxImpl } from '../src/lib/api-fx-impl';

describe('ApiFxImpl Tests', () => {
  let baseTest: BaseTest<Order>;
  let apiFx: ApiFx;
  beforeAll(() => {
    baseTest = new BaseTest<Order>();
    apiFx = new ApiFxImpl(baseTest.webContext);
  });

  it('ApiFx create entity', () => {
    const order: Order = {
      id: '',
      amount: 1000,
      date: new Date(),
      isActive: true,
      orderNumber: 'OR0001',
      parentId: {
        entityType: 'account',
        id: 'GUID-PARENTID',
        name: 'PARENT'
      },
      stateCode: {
        text: 'ACTIVE',
        value: 101
      }
    };

    apiFx
      .create<Order>(ORDER_METADATA, order)
      .subscribe(success => {
        expect(success.id).not.toBeNull();

        const created = baseTest.xrmFakedApiContext.getEntity(
          ORDER_METADATA.entityName,
          success.id
        );
        expect(created).not.toBeNull();
      });
  });

  it('ApiFx update entity', () => {
    baseTest.xrmFakedApiContext.initialize([
      new FakeTestEntity(ORDER_METADATA.entityName, '1f392ac5-ace2-4143-9219-18232e558dfe')
    ]);
    
    const order = {
      id: '1f392ac5-ace2-4143-9219-18232e558dfe',
      amount: 1000,
      date: new Date(),
      isActive: true,
      orderNumber: 'OR0001'
    };
    apiFx.update(ORDER_METADATA, '0001', order).subscribe(success => {
      const updated = baseTest.xrmFakedApiContext.getEntity(ORDER_METADATA.entityName, '0001');
      expect(updated).not.toBeNull();
    });
  });
});
