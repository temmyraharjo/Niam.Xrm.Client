import { Entity, KeyOf, EntityMetadata } from '../definitions';
import { toEntity } from './to-entity';
import { select } from './select';
import { toWebApiEntityRequest } from './to-web-api-entity-request';

export class OrganizationService {
  constructor(
    public readonly webApi: Xrm.WebApi,
    private readonly metadata: EntityMetadata[]
  ) { }

  execute(request: any) {
    return new Promise((resolve, reject) => {
      this.webApi.online.execute(request).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }
  executeMultiple(request: any[]) {
    return new Promise((resolve, reject) => {
      this.webApi.online.executeMultiple(request).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  retrieveMultiple(entityLogicalName: string, options?: string, maxPageSize?: number)
    : Promise<any> {
    return new Promise((resolve, reject) => {
      this.webApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  retrieveRecord(entityLogicalName: string, id: string, options?: string) {
    return new Promise((resolve, reject) => {
      this.webApi.retrieveRecord(entityLogicalName, id, options).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  create<TEntity extends Entity = Entity>(
    entityLogicalName: string,
    entity: TEntity
  ): Promise<Xrm.CreateResponse> {
    return new Promise((resolve, reject) => {
      const webapiEntity = toWebApiEntityRequest(
        this.metadata,
        entityLogicalName,
        entity
      );

      this.webApi.createRecord(entityLogicalName, webapiEntity).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  delete(entityLogicalName: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.webApi.deleteRecord(entityLogicalName, id).then(
        () => resolve(),
        (error) => reject(error)
      );
    });
  }

  update<TEntity extends Entity = Entity>(
    entityLogicalName: string,
    id: string,
    entity: TEntity
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const webapiEntity = toWebApiEntityRequest(
        this.metadata,
        entityLogicalName,
        entity
      );

      this.webApi.updateRecord(entityLogicalName, id, webapiEntity).then(
        () => resolve(),
        (error) => reject(error)
      );
    });
  }

  retrieve<TEntity extends Entity = Entity>(
    lookup: Xrm.LookupValue,
    attributes?: KeyOf<TEntity>[]
  ): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(
    lookupRef: Xrm.LookupValue[],
    attributes?: KeyOf<TEntity>[]
  ): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(
    entityLogicalName: string,
    id: string,
    attributes?: KeyOf<TEntity>[]
  ): Promise<TEntity>;
  retrieve<TEntity extends Entity = Entity>(
    nameOrLookup: string | Xrm.LookupValue | Xrm.LookupValue[],
    idOrAttributes: string | KeyOf<TEntity>[],
    attributes?: KeyOf<TEntity>[]
  ): Promise<TEntity> {
    if (Array.isArray(nameOrLookup)) {
      const lookup = (nameOrLookup as Xrm.LookupValue[])[0];
      return this.retrieveCore<TEntity>(
        lookup.entityType,
        lookup.id,
        idOrAttributes as KeyOf<TEntity>[]
      );
    } else if (typeof nameOrLookup === 'object') {
      const lookup = nameOrLookup as Xrm.LookupValue;
      return this.retrieveCore<TEntity>(
        lookup.entityType,
        lookup.id,
        idOrAttributes as KeyOf<TEntity>[]
      );
    }

    return this.retrieveCore<TEntity>(
      nameOrLookup as string,
      idOrAttributes as string,
      attributes
    );
  }

  private retrieveCore<TEntity extends Entity = Entity>(
    entityLogicalName: string,
    id: string,
    attributes?: KeyOf<TEntity>[]
  ): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      const entityMetadata = this.metadata.find(
        (md) => md.logicalName == entityLogicalName
      );
      if (!entityMetadata) {
        throw new Error(`No metadata found for entity: ${entityLogicalName}`);
      }

      const selectOption = select(entityMetadata, attributes ?? []);
      const optionParts = [selectOption];
      const options =
        attributes && attributes.length > 0 ? `?${optionParts.join('&')}` : '';

      this.webApi.retrieveRecord(entityLogicalName, id, options).then(
        (response) => {
          const result = toEntity<TEntity>(entityMetadata, response);
          resolve(result);
        },
        (error) => reject(error)
      );
    });
  }
}
