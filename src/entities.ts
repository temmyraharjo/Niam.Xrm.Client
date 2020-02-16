export interface Order {
    date: Date;
    parentId: Xrm.LookupValue;
    stateCode: Xrm.OptionSetValue;
    amount: number;
    orderNumber: string;
    isActive: boolean;
}