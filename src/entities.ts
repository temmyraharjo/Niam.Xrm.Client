import { createEntityMetadata } from './lib/data';

export interface Order {
  date: Date;
  parentId: Xrm.LookupValue;
  stateCode: Xrm.OptionSetValue;
  amount: number;
  orderNumber: string;
  isActive: boolean;
}

export const ORDER_METADATA = createEntityMetadata([
        { attributeName: 'date', dataType: 'datetime' },
        { attributeName: 'parentId', dataType: 'lookup' },
        { attributeName: 'stateCode', dataType: 'optionset' },
        { attributeName: 'amount', dataType: 'decimal' },
        { attributeName: 'orderNumber', dataType: 'string' },
        { attributeName: 'isActive', dataType: 'boolean' },
    ]
);
