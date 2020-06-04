import { Entity, EntityMetadata } from './definitions';

export class Service {
  constructor(private webApi: Xrm.WebApi) {}
  private _metadataCollections: EntityMetadata[] = [];

  init(metadataCollections: EntityMetadata[]) {
    this._metadataCollections = this._metadataCollections.concat(
      metadataCollections
    );
  }

  private mappingToEntity(
    metadata: EntityMetadata,
    result: any
  ): Entity {
    const resultProperties = Object.getOwnPropertyNames(result);

    const data: Entity = {};
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
          data[property.logicalName] = [
            {
              entityType: result[logicalNameAttribute],
              id: result[lookupIdAttribute],
              name: result[lookupNameAttribute],
            },
          ];
          break;
        case 'datetime':
          const dateValueAttribute = metadataAttributes.find(
            (e) => e.indexOf(property.logicalName) === 0
          );
          data[property.logicalName] = new Date(result[dateValueAttribute]);
          break;
        default:
          const defaultValueAttribute = metadataAttributes.find(
            (e) => e.indexOf(property.logicalName) === 0
          );
          data[property.logicalName] = result[defaultValueAttribute];
          break;
      }
    }

    return data;
  }

  retrieve<TEntity extends Entity = Entity>(
    entityLogicalName: string,
    id: string,
    attributes?: string[]
  ): Promise<TEntity> {
    return new Promise(async (resolve) => {
      const metadata = this._metadataCollections.find(
        (e) => e.schemaName == entityLogicalName
      );

      if (!metadata) {
        throw new Error(
          `No schemaName found for this metadata ${entityLogicalName}`
        );
      }

      const options = attributes
        ? '?$select=' + attributes.map((e) => e.trim()).join(',')
        : '';
      const result = await this.webApi.retrieveRecord(
        metadata.logicalName,
        id,
        options
      );

      const record = this.mappingToEntity(metadata, result);
      return resolve(record as TEntity);
    });
  }
}
