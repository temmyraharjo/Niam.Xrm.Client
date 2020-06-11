import { Entity } from './definitions/entity';
import { v4 as guid } from 'uuid';
import { toEntity } from './to-entity';
import { update } from './update';
import { toWebApiEntity } from './utils/to-web-api-entity';

export class InMemoryWebApi implements Xrm.WebApi {
  private entities: Entity[] = [];

  init(entities: Entity[]) {
    this.entities = entities;
  }

  private getIndex(entityLogicalName: string, id: string) {
    const index = this.entities.findIndex(
      (e) => e.id === id && e.logicalName === entityLogicalName
    );

    return index;
  }

  get(entityLogicalName: string, id: string) {
    const index = this.getIndex(entityLogicalName, id);

    return this.entities[index] ?? null;
  }

  private replace(entityLogicalName: string, id: string, data: Entity) {
    const index = this.getIndex(entityLogicalName, id);

    this.entities[index] = data;
  }

  isAvailableOffline(entityLogicalName: string): boolean {
    throw new Error('Method not implemented.');
  }
  online: Xrm.WebApiOnline;

  offline: Xrm.WebApiOffline;

  getEntities(): Entity[] {
    return this.entities;
  }

  createRecord(
    entityLogicalName: string,
    record: any
  ): Xrm.Async.PromiseLike<Xrm.CreateResponse> {
    const promise = new Promise((resolve, reject) => {
      try {
        const id = guid();
        const entity = toEntity(entityLogicalName, id, record);
        this.entities.push(entity);

        const result: Xrm.CreateResponse = {
          entityType: entityLogicalName,
          id: id,
        };
        resolve(result);
      } catch (ex) {
        reject(ex);
      }
    }) as any;

    return promise;
  }

  deleteRecord(
    entityLogicalName: string,
    id: string
  ): Xrm.Async.PromiseLike<string> {
    const promise = new Promise((resolve, reject) => {
      try {
        const index = this.getIndex(entityLogicalName, id);
        this.entities.splice(index, 1);

        const result: Xrm.CreateResponse = {
          entityType: entityLogicalName,
          id: id,
        };

        resolve(JSON.stringify(result));
      } catch (ex) {
        reject(ex);
      }
    });

    return promise as any;
  }

  retrieveRecord(
    entityLogicalName: string,
    id: string,
    options?: string
  ): Xrm.Async.PromiseLike<any> {
    const promise = new Promise((resolve, reject) => {
      try {
          const entity = this.get(entityLogicalName, id);
          const webEntity = toWebApiEntity(entity);
          resolve(webEntity);
      } catch (ex) {
          reject(ex);
      }
    });

    return promise as any;
  }

  retrieveMultipleRecords(
    entityLogicalName: string,
    options?: string,
    maxPageSize?: number
  ): Xrm.Async.PromiseLike<Xrm.RetrieveMultipleResult> {
    throw new Error('Method not implemented.');
  }

  updateRecord(
    entityLogicalName: string,
    id: string,
    data: any
  ): Xrm.Async.PromiseLike<any> {
    const promise = new Promise((resolve, reject) => {
      try {
        const record = this.get(entityLogicalName, id);
        const target = toEntity(entityLogicalName, id, data);
        const updated = update(record, target);
        this.replace(entityLogicalName, id, updated);

        const result = {
          entityType: entityLogicalName,
          id: id,
        };

        resolve(result);
      } catch (ex) {
        reject(ex);
      }
    });

    return promise as any;
  }
}
