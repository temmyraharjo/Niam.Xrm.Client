export interface AttributeMetadata {
    attributeName: string,
    dataType: Xrm.Attributes.AttributeType
}

 export function createEntityMetadata(entityMetadata: AttributeMetadata[]) : AttributeMetadata[] {
   return entityMetadata;
}