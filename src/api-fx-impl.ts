import { ApiFx } from './lib/interfaces/api-fx';
import { EntityMetadata } from './lib/data';

export class ApiFxImpl implements ApiFx {
  constructor(public context: Xrm.WebApi) { }

  create(
    metadata: EntityMetadata,
    record: any
  ): Xrm.Async.PromiseLike<Xrm.CreateResponse> {
    return this.context.createRecord(metadata.entityName, record);
  }
}
