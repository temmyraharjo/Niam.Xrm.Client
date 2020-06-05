import { EntityMetadata } from '../../main';
import { Entity } from '../definitions';

export function transformToEntity<TEntity extends Entity = Entity>(metadata: EntityMetadata, 
    apiResult: any): TEntity {
    const resultProperties = Object.getOwnPropertyNames(apiResult);

    const result: Entity = {};
    for (const property of metadata.attributes) {
      const metadataAttributes = resultProperties.filter(
        (e) => e.toLowerCase().indexOf(property.logicalName.toLowerCase()) > -1
      );
      if (!metadataAttributes) continue;
      switch (property.attributeType) {
        case 'lookup':
        case 'owner':
          const lookupNameAttribute = metadataAttributes.find(
            (e) => e.indexOf('OData.Community.Display.V1.FormattedValue') > -1
          );
          const logicalNameAttribute = metadataAttributes.find(
            (e) => e.indexOf('Microsoft.Dynamics.CRM.lookuplogicalname') > -1
          );
          const lookupIdAttribute = metadataAttributes.find(
            (e) => e.indexOf('_value') === (e.length - 6)
          );
          result[property.logicalName] = [
            {
              entityType: apiResult[logicalNameAttribute],
              id: apiResult[lookupIdAttribute],
              name: apiResult[lookupNameAttribute],
            },
          ];
          break;
        case 'datetime':
          const dateValueAttribute = metadataAttributes.find(
            (e) => e.indexOf(property.logicalName) === 0
          );
          result[property.logicalName] = new Date(apiResult[dateValueAttribute]);
          break;
        default:
          const defaultValueAttribute = metadataAttributes.find(
            (e) => e.indexOf(property.logicalName) === 0 && property.logicalName.length === e.length
          );
          result[property.logicalName] = apiResult[defaultValueAttribute];
          break;
      }
    }

    return result as TEntity;
}