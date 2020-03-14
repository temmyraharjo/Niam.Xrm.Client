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

function getAttributeKey(
  attributes: string[],
  searchAttribute: string
): string {
  const filterData = attributes.filter(attr => {
    const splitData = attr.split(searchAttribute);
    const isBehindValid = splitData[splitData.length - 1] === '';
    return isBehindValid;
  });
  return filterData.length > 0 ? filterData[0] : null;
}

export function createApiObjectToEntity<T>(
  entityMetadata: EntityMetadata,
  entity: any
): T {
  const result = {};
  const attributesEntity = Object.keys(entity);
  for (var attr of entityMetadata.attributes) {
    const listAttributes = attributesEntity.filter(
      existing => existing.indexOf(attr.attributeName) > -1
    );

    switch (attr.dataType) {
      case 'lookup':
        const formattedValueAttribute = getAttributeKey(
          listAttributes,
          '@OData.Community.Display.V1.FormattedValue'
        );
        const logicalNameAttribute = getAttributeKey(
          listAttributes,
          '@Microsoft.Dynamics.CRM.lookuplogicalname'
        );
        const lookupValueAttribute = getAttributeKey(listAttributes, '_value');
        const lookup: Xrm.LookupValue = {
          name: entity[formattedValueAttribute],
          entityType: entity[logicalNameAttribute],
          id: entity[lookupValueAttribute]
        };
        result[attr.attributeName] = lookup;
        break;
      case 'optionset':
        const stateCodeValueAttribute = getAttributeKey(
          listAttributes,
          attr.attributeName
        );
        const stateCodeDisplayAttribute = getAttributeKey(
          listAttributes,
          '@OData.Community.Display.V1.FormattedValue'
        );
        const optionSetValue: Xrm.OptionSetValue = {
          text: entity[stateCodeDisplayAttribute],
          value: entity[stateCodeValueAttribute]
        };
        result[attr.attributeName] = optionSetValue;
        break;
      default:
        const othersValueAttribute = getAttributeKey(
          listAttributes,
          attr.attributeName
        );
        result[attr.attributeName] = entity[othersValueAttribute];
        break;
    }
  }
  return result as T;
}

export function createApiObjectByEntity<T>(
  entityMetadata: EntityMetadata,
  entity: T
) {
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
