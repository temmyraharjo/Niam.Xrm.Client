import { BaseTest } from '../src/tests/base-test';
import { Order, ORDER_METADATA } from '../src/entities';
import { ApiFx } from '../src/lib/interfaces/api-fx';
import { ApiFxImpl } from '../src/lib/api-fx-impl';
import { Entity } from 'fakexrmeasy';

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

    apiFx.create<Order>(ORDER_METADATA, order).subscribe(success => {
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
      new Entity(
        ORDER_METADATA.entityName,
        '1f392ac5-ace2-4143-9219-18232e558dfe',
        {}
      )
    ]);

    const order = {
      id: '1f392ac5-ace2-4143-9219-18232e558dfe',
      amount: 1000,
      date: new Date(),
      isActive: true,
      orderNumber: 'OR0001'
    };

    apiFx
      .update(ORDER_METADATA, '1f392ac5-ace2-4143-9219-18232e558dfe', order)
      .subscribe(success => {
        expect(success).not.toBeNull();
        const updated = baseTest.xrmFakedApiContext.getEntity(
          ORDER_METADATA.entityName,
          '1f392ac5-ace2-4143-9219-18232e558dfe'
        );
        expect(updated).not.toBeNull();
        expect(updated.attributes['amount']).toEqual(1000);
      });
  });

  it('ApiFx delete entity', () => {
    baseTest.xrmFakedApiContext.initialize([
      new Entity(
        ORDER_METADATA.entityName,
        '1f392ac5-ace2-4143-9219-18232e558df3',
        {}
      )
    ]);

    apiFx
      .delete(ORDER_METADATA, '1f392ac5-ace2-4143-9219-18232e558df3')
      .subscribe(success => {
        expect(success).not.toBeNull();
      });
  });

  it('ApiFx retrieve multiple records', () => {
    const attribute = {
      id: '1f392ac5-ace2-4143-9219-18232e558df3',
      'stateCode@OData.Community.Display.V1.FormattedValue': 'Active',
      stateCode: 0,
      '_parentId_value':'465b158c-541c-e511-80d3-3863bb347ba8',
      '_parentId_value@OData.Community.Display.V1.FormattedValue': 'PARENT CONTACT',
      '_parentId_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'Account',
      date: '2020-02-09T02:36:00Z',
      'date@OData.Community.Display.V1.FormattedValue': "9/02/2020 10:36 PG",
      'amount': 0,
      'amount@OData.Community.Display.V1.FormattedValue': "RM0.00",
      'orderNumber': 'OR-0001',
      isActive: true,
      'isActive@OData.Community.Display.V1.FormattedValue': 'Yes'
    };

    baseTest.xrmFakedApiContext.initialize([
      new Entity(ORDER_METADATA.entityName,
        '1f392ac5-ace2-4143-9219-18232e558df3',
        attribute)
    ]);

    apiFx.retrieveRecords(ORDER_METADATA, 
      '?$select=id,stateCode,parentId,date,amount,orderNumber,isActive&$filter=id eq 1f392ac5-ace2-4143-9219-18232e558df3'
      ).subscribe((entities) => {
        const result = entities[0] as Order;
        expect(result.id).toEqual('1f392ac5-ace2-4143-9219-18232e558df3');
        expect(result.orderNumber).toEqual('OR-0001');
    });
  });
});
