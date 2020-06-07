import { Entity, KeyOf, EntityMetadata } from '../definitions';
import { toEntity } from './to-entity';
import { select } from './select';

export class OrganizationService {
  constructor(private readonly webApi: Xrm.WebApi, private readonly metadata: EntityMetadata[]) {
  }

  // https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrieverecord
  retrieve<TEntity extends Entity = Entity>(lookup: Xrm.LookupValue, attributes?: KeyOf<TEntity>[]): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(lookupRef: Xrm.LookupValue[], attributes?: KeyOf<TEntity>[]): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(entityLogicalName: string, id: string, attributes?: KeyOf<TEntity>[]): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(
    nameOrLookup: string | Xrm.LookupValue | Xrm.LookupValue[],
    idOrAttributes: string | KeyOf<TEntity>[],
    attributes?: KeyOf<TEntity>[]): Promise<TEntity> {
      if (Array.isArray(nameOrLookup)) {
        const lookup = (nameOrLookup as Xrm.LookupValue[])[0];
        return this.retrieveCore<TEntity>(lookup.entityType, lookup.id, idOrAttributes as KeyOf<TEntity>[]);
      } else if (typeof nameOrLookup === 'object') {
        const lookup = (nameOrLookup as Xrm.LookupValue);
        return this.retrieveCore<TEntity>(lookup.entityType, lookup.id, idOrAttributes as KeyOf<TEntity>[]);
      }

      return this.retrieveCore<TEntity>(nameOrLookup as string, idOrAttributes as string, attributes);
  }

  private retrieveCore<TEntity extends Entity = Entity>(entityLogicalName: string, id: string, attributes?: KeyOf<TEntity>[]): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      const entityMetadata = this.metadata.find(md => md.logicalName == entityLogicalName);
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
