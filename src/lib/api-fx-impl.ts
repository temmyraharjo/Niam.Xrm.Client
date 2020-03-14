import { ApiFx } from './interfaces/api-fx';
import { EntityMetadata, createApiObjectToEntity } from './data';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { createApiObjectByEntity } from './data';

export class ApiFxImpl implements ApiFx {
  constructor(public context: Xrm.WebApi) {}

  create<T>(
    metadata: EntityMetadata,
    entity: T
  ): Observable<Xrm.CreateResponse> {
    const value = createApiObjectByEntity(metadata, entity);
    const result = this.context.createRecord(metadata.entityName, value);
    return from(result);
  }

  update<T>(metadata: EntityMetadata, id: string, entity: T): Observable<any> {
    const value = createApiObjectByEntity(metadata, entity);
    const result = this.context.updateRecord(metadata.entityName, id, value);

    return from(result);
  }

  delete(metadata: EntityMetadata, id: string): Observable<string> {
    const result = this.context.deleteRecord(metadata.entityName, id);
    return from(result);
  }

  retrieveRecords<T>(
    metadata: EntityMetadata,
    options?: string,
    maxPageSize?: number
  ): Observable<T[]> {
    const result = this.context.retrieveMultipleRecords(
      metadata.entityName,
      options,
      maxPageSize
    );
    const obs = from(result).pipe(
      map(data => {
        const list: T[] = [];

        for (var record of data.entities) {
          const entity = createApiObjectToEntity<T>(metadata, record);
          list.push(entity);
        }

        return list;
      })
    );

    return obs;
  }
}
