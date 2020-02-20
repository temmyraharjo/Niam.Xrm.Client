export interface EntityMetadata {
  entityName: string;
  odata: string;
  attributes: AttributeMetadata[];
}

export interface AttributeMetadata {
  attributeName: string;
  displayName: string;
  dataType: Xrm.Attributes.AttributeType;
}

export function createEntityMetadata(
  entityMetadata: EntityMetadata
): EntityMetadata {
  return entityMetadata;
}

export function createApiObjectByEntity<T>(entityMetadata: EntityMetadata, entity: T) {
  const result = {};
  const attributes = Object.keys(entity);
  attributes.forEach(attr => {
    const attributeMetadata = entityMetadata.attributes.find(
      e => e.attributeName == attr
    );
    if (attributeMetadata == null) return;

    const value = entity[attr];
    switch (attributeMetadata.dataType) {
      case 'lookup':
        result[attributeMetadata.displayName + '@odata.bind'] = getLookupValue(
          value
        );
        break;
      case 'optionset':
        result[attributeMetadata.displayName] = getOptionSet(value);
        break;
      default:
        result[attributeMetadata.displayName] = value;
        break;
    }
  });

  return result;
}

function getOptionSet(value: any) {
  const optionSet = value as Xrm.OptionSetValue;
  return optionSet.value;
}

function getLookupValue(value: any) {
  const lookupData = value as Xrm.LookupValue;
  return '/' + lookupData.entityType + 's(' + lookupData.id + ')';
}
