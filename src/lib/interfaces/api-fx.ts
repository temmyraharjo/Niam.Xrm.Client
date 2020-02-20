import { EntityMetadata } from '../data';
import { Observable } from 'rxjs';

export interface ApiFx {
    context: Xrm.WebApi;
    create<T>(metadata: EntityMetadata,
        entity: T): Observable<Xrm.CreateResponse>;
    update<T>(metadata: EntityMetadata, id: string, entity: T): Observable<any>;
}