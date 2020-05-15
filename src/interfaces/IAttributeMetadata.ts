export interface IAttributeMetadata {
    name: string;
    apiName: string;
    type: 'string' | 'number' | 
        'ILookupValue[]' | 'Date' | 'IOptionSetValue';
}
