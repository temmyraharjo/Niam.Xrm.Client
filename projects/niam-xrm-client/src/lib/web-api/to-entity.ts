import { EntityMetadata } from '../../main';
import { Entity, EntityAttributeValue } from '../definitions';

export function toEntity<TEntity extends Entity>(entityMetadata: EntityMetadata, webApiRetrieveResponse: { [k: string]: any }): TEntity {
  const keys = Object.keys(webApiRetrieveResponse);
  const names = keys.filter(k => k.indexOf('@') === -1); // Ignore metadata properties
  const result: Entity = {};

  for (const name of names) {
    const attributeName = getAttributeName(name);
    result[attributeName] = getAttributeValue(entityMetadata, webApiRetrieveResponse, attributeName);
  }

  return result as TEntity;
}

function getAttributeName(name: string): string {
  const isLookup = name.startsWith('_') && name.endsWith('_value');
  return isLookup ? name.substr(1, name.length - 7) : name;
}

function getAttributeValue(entityMetadata: EntityMetadata, webApiRetrieveResponse: { [k: string]: any }, attributeName: string): EntityAttributeValue {
  const attributeMetadata = entityMetadata.attributes.find(md => md.logicalName === attributeName);

  switch (attributeMetadata.attributeType) {
    case 'lookup':
    case 'owner':
      const lookupValue: Xrm.LookupValue = {
        id: webApiRetrieveResponse[name],
        name: webApiRetrieveResponse[`${name}@OData.Community.Display.V1.FormattedValue`],
        // TODO: is entityType objectytpecode or logicalname ?
        entityType: webApiRetrieveResponse[`${name}@Microsoft.Dynamics.CRM.lookuplogicalname`],
      };
      return [lookupValue];
    
    case 'datetime':
      return new Date(webApiRetrieveResponse[name]);

    default:
      return webApiRetrieveResponse[name];
  }
}