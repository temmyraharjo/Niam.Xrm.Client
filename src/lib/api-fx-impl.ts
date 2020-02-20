import { ApiFx } from './interfaces/api-fx';
import { EntityMetadata } from './data';
import { Observable, from } from 'rxjs';
import {createApiObjectByEntity} from './data';

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
}
