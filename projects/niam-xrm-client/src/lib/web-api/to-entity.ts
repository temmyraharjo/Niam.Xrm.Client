import { EntityMetadata } from '../../main';
import { Entity, EntityAttributeValue } from '../definitions';

interface Attribute {
  name: string;
  value: EntityAttributeValue
}

export function toEntity<TEntity extends Entity>(entityMetadata: EntityMetadata, webApiRetrieveResponse: { [k: string]: any }): TEntity {
  const keys = Object.keys(webApiRetrieveResponse);
  const names = keys.filter(k => k.indexOf('@') === -1); // Ignore metadata properties
  const result = names
    .map(name => getAttribute(entityMetadata, webApiRetrieveResponse, name))
    .filter(attribute => attribute)
    .reduce((e, attribute) => {
      e[attribute.name] = attribute.value;
      return e;
    }, {} as Entity);
  return result as TEntity;
}

function getAttribute(entityMetadata: EntityMetadata, webApiRetrieveResponse: { [k: string]: any }, name: string): Attribute {
  const attributeName = getAttributeName(name);
  const attributeMetadata = entityMetadata.attributes.find(md => md.logicalName === attributeName);
  if (!attributeMetadata) {
    console.log(`entityMetadata ${entityMetadata.logicalName} doesn't have an attribute with name ${name}.`);
    return null;
  }

  switch (attributeMetadata.attributeType) {
    case 'lookup':
    case 'owner':
      const lookupValue: Xrm.LookupValue = {
        id: webApiRetrieveResponse[name],
        name: webApiRetrieveResponse[`${name}@OData.Community.Display.V1.FormattedValue`],
        entityType: webApiRetrieveResponse[`${name}@Microsoft.Dynamics.CRM.lookuplogicalname`],
      };
      return { name: attributeName, value: [lookupValue] };

    case 'datetime':
      return { name: attributeName, value: new Date(webApiRetrieveResponse[name]) };

    default:
      return { name: attributeName, value: webApiRetrieveResponse[name] };
  }
}

function getAttributeName(name: string): string {
  const isLookup = name.startsWith('_') && name.endsWith('_value');
  return isLookup ? name.substr(1, name.length - 7) : name;
}
