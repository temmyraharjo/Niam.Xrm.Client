import { createApiObjectToEntity } from '../src/lib/data';
import { ORDER_METADATA, Order } from '../src/entities';

describe('Data Tests', function() {
    it('Convert Object To T', function() {
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

        const result = createApiObjectToEntity<Order>(ORDER_METADATA, attribute);
        expect(result.id).toBe('1f392ac5-ace2-4143-9219-18232e558df3');
        expect(result.amount).toEqual(0.0);
        expect(result.date).toEqual('2020-02-09T02:36:00Z');

        expect(result.parentId).not.toBeNull();
        expect(result.parentId.entityType).toEqual('Account');
        expect(result.parentId.id).toEqual('465b158c-541c-e511-80d3-3863bb347ba8');
        expect(result.parentId.name).toEqual('PARENT CONTACT');

        expect(result.stateCode).not.toBeNull();
        expect(result.stateCode.value).toBe(0);
        expect(result.stateCode.text).toEqual('Active');

        expect(result.orderNumber).toEqual('OR-0001');
        expect(result.isActive).toEqual(true);
    });
});