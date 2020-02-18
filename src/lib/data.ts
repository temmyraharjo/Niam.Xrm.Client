export interface EntityMetadata { 
  entityName: string;
  attributes: AttributeMetadata[];
}

export interface AttributeMetadata {
    attributeName: string,
    dataType: Xrm.Attributes.AttributeType
}

 export function createEntityMetadata(entityMetadata: EntityMetadata) : EntityMetadata {
   return entityMetadata;
}