import { Entity, KeyOf, EntityMetadata } from '../definitions';
import { toEntity } from './to-entity';
import { select } from './select';

export class OrganizationService {
  constructor(private webApi: Xrm.WebApi) {
  }

  private _entityMetadataCollection: EntityMetadata[] = [];

  init(entityMetadataCollection: EntityMetadata[]) {
    this._entityMetadataCollection = entityMetadataCollection;
  }

  // https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrieverecord
  retrieve<TEntity extends Entity = Entity>(entityLogicalName: string, id: string, attributes?: KeyOf<TEntity>[]): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      const entityMetadata = this._entityMetadataCollection.find(md => md.logicalName == entityLogicalName);
      if (!entityMetadata) {
        throw new Error(`No metadata found for entity: ${entityLogicalName}`);
      }

      const selectOption = select(entityMetadata, attributes ?? []);
      const optionParts = [selectOption];
      const options = attributes && attributes.length > 0 ? `?${optionParts.join('&')}` : '';

      this.webApi.retrieveRecord(entityLogicalName, id, options).then(
        response => {
          const result = toEntity<TEntity>(entityMetadata, response);
          resolve(result);
        },
        error => reject(error)
      );
    });
  }
}
