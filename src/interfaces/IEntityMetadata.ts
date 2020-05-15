import { IAttributeMetadata } from './IAttributeMetadata';
export interface IEntityMetadata {
    logicalName: string;
    attributesMetadata: IAttributeMetadata[];
}
