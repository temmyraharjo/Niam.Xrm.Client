import { EntityMetadata } from '../data';

export interface ApiFx {
    context: Xrm.WebApi;
    create(metadata: EntityMetadata, record: any): Xrm.Async.PromiseLike<Xrm.CreateResponse>;
}