import { Entity, EntityMetadata } from './definitions';
import { transformToEntity } from './utils/index';

export class Service {
  constructor(private webApi: Xrm.WebApi) {}
  private _metadataCollections: EntityMetadata[] = [];

  init(metadataCollections: EntityMetadata[]) {
    this._metadataCollections = metadataCollections;
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

      const record = transformToEntity<TEntity>(metadata, result);
      return resolve(record);
    });
  }
}
