import { createEntityMetadata } from './lib/data';

export interface Order {
  id: string;
  date: Date;
  parentId: Xrm.LookupValue;
  stateCode: Xrm.OptionSetValue;
  amount: number;
  orderNumber: string;
  isActive: boolean;
}

export const ORDER_METADATA = createEntityMetadata({
  entityName: 'order',
  odata: 'orders',
  attributes: [
    { attributeName: 'date', displayName: 'date', dataType: 'datetime' },
    { attributeName: 'parentId', displayName: 'parentId', dataType: 'lookup' },
    { attributeName: 'stateCode', displayName: 'stateCode', dataType: 'optionset' },
    { attributeName: 'amount', displayName: 'amount', dataType: 'decimal' },
    { attributeName: 'orderNumber', displayName: 'orderNumber', dataType: 'string' },
    { attributeName: 'isActive', displayName: 'isActive', dataType: 'boolean' }
  ]
});
