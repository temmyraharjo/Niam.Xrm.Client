import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContext } from '../lib/interfaces/xrm-fx-context';
import { XrmFxContextImpl } from '../lib/xrm-fx-context-impl';
import { AttributeMetadata, EntityMetadata } from '../lib/data';
import { XrmFakedContext, Entity } from 'fakexrmeasy';
import ODataParsedUrl from 'fakexrmeasy/dist/ODataParsedUrl';

export interface AttributeInForm<K> {
  attributeName: K;
  isDisabled: boolean;
}

interface ErrorResponse {
  errorCode: number;
  message: string;
}

interface PromiseLike<T> {
  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (error: any) => U | PromiseLike<U>
  ): PromiseLike<U>;

  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (error: any) => void
  ): PromiseLike<U>;

  fail<U>(
    onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>
  ): PromiseLike<U>;

  always<U>(alwaysCallback: () => U | PromiseLike<U>): PromiseLike<U>;

  catch<U>(
    onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>
  ): PromiseLike<U>;

  finally<U>(finallyCallback: () => U | PromiseLike<U>): PromiseLike<U>;
}

type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (error: any) => void
) => void;

class XrmPromise<T> implements PromiseLike<T> {
  private _promise: Promise<T>;

  constructor(executor: PromiseExecutor<T> | Promise<T>) {
    this._promise =
      executor instanceof Promise ? executor : new Promise<T>(executor);
  }

  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (error: any) => void
  ): PromiseLike<U>;
  then<U>(
    onFulfilled?: (value: T) => U | PromiseLike<U>,
    onRejected?: (error: any) => U | PromiseLike<U>
  ): PromiseLike<U> {
    return new XrmPromise<U>(this._promise.then<U, U>(onFulfilled, onRejected));
  }

  fail<U>(
    onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>
  ): PromiseLike<U> {
    return new XrmPromise<U>(this._promise.then<U, U>(undefined, onRejected));
  }

  always<U>(alwaysCallback: () => U | PromiseLike<U>): PromiseLike<U> {
    return new XrmPromise<U>(
      this._promise.then<U, U>(alwaysCallback, alwaysCallback)
    );
  }

  catch<U>(
    onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>
  ): PromiseLike<U> {
    return new XrmPromise<U>(this._promise.then<U, U>(undefined, onRejected));
  }

  finally<U>(finallyCallback: () => U | PromiseLike<U>): PromiseLike<U> {
    return new XrmPromise<U>(
      this._promise.then<U, U>(finallyCallback, finallyCallback)
    );
  }
}

export class FakedWebContext implements Xrm.WebApi {
  constructor(private webContext: XrmFakedContext) {}

  isAvailableOffline(entityLogicalName: string): boolean {
    throw new Error('Method not implemented.');
  }
  online: Xrm.WebApiOnline;
  offline: Xrm.WebApiOffline;
  createRecord(
    entityLogicalName: string,
    record: any
  ): Xrm.Async.PromiseLike<Xrm.CreateResponse> {
    const result = new XrmPromise<Xrm.CreateResponse>((resolve) => {
      const entityAttribute = {};
      var keys = Object.keys(record);

      keys.forEach(key => (entityAttribute[key] = record[key]));

      const entity = new Entity(entityLogicalName, '', entityAttribute);
      const id = this.webContext.addEntity(entity);
      const result: Xrm.CreateResponse = {
        entityType: entityLogicalName,
        id: id
      };
      resolve(result);
    });

    return result;
  }

  deleteRecord(
    entityLogicalName: string,
    id: string
  ): Xrm.Async.PromiseLike<string> {
    this.webContext.removeEntity(entityLogicalName, id);
    return new XrmPromise((resolve, rejects) => {
      resolve('success');
    });
  }

  retrieveRecord(
    entityLogicalName: string,
    id: string,
    options?: string
  ): Xrm.Async.PromiseLike<any> {
    throw new Error('Method not implemented.');
  }

  retrieveMultipleRecords(
    entityLogicalName: string,
    options?: string,
    maxPageSize?: number
  ): Xrm.Async.PromiseLike<Xrm.RetrieveMultipleResult> {
    // const queryUrl = ODataParsedUrl.
    // const query = this.webContext.createQuery(entityLogicalName).;
    // query.

    throw new Error('Method not implemented.');
  }

  updateRecord(
    entityLogicalName: string,
    id: string,
    record: any
  ): Xrm.Async.PromiseLike<any> {
    const result = new XrmPromise((resolve) => {
      const entityAttribute = {};
      var keys = Object.keys(record);
      keys.forEach(key => (entityAttribute[key] = record[key]));

      const entity = new Entity(entityLogicalName, id, entityAttribute);
      this.webContext.updateEntity(entity);
      resolve('success');
    });

    return result;
  }
}

export class BaseTest<T> {
  private initialEntity: T;

  public xrmFakedApiContext = new XrmFakedContext(
    'v9.0',
    'http://localhost',
    true
  );

  private _webContext: Xrm.WebApi;
  public get webContext(): Xrm.WebApi {
    if (this._webContext == null) {
      this._webContext = new FakedWebContext(this.xrmFakedApiContext);
    }

    return this._webContext;
  }

  public get xrmMock() {
    return XrmMockGenerator;
  }

  init<K extends keyof T>(
    formMetadata: AttributeInForm<K>[],
    entityMetadata: EntityMetadata,
    entity: T = null
  ) {
    this.xrmMock.initialise();
    this.createFormAttributes(formMetadata, entityMetadata.attributes);
    this.initialEntity = entity;

    return this;
  }

  private createFormAttributes<K extends keyof T>(
    formMetadata: AttributeInForm<K>[],
    attributesMetadata: AttributeMetadata[]
  ) {
    formMetadata.forEach(attr => {
      const metadata = attributesMetadata.filter(
        e => e.attributeName == attr.attributeName.toString()
      );
      if (metadata.length == 0) return;
      const attributeMetadata = metadata[0];
      const dataType = attributeMetadata.dataType;
      const attributeName = attr.attributeName.toString();
      switch (dataType) {
        case 'boolean':
          this.xrmMock.Attribute.createBoolean(attributeName);
          break;
        case 'datetime':
          this.xrmMock.Attribute.createDate(attributeName);
          break;
        case 'lookup':
          this.xrmMock.Attribute.createLookup(attributeName, null);
          break;
        case 'decimal':
        case 'double':
        case 'integer':
        case 'money':
          this.xrmMock.Attribute.createString(attributeName);
          break;
        case 'memo':
        case 'string':
          this.xrmMock.Attribute.createString(attributeName);
          break;
        case 'optionset':
        case 'multioptionset':
          this.xrmMock.Attribute.createOptionSet(attributeName);
          break;
      }
    });
  }

  public get eventContext() {
    return this.xrmMock.getEventContext();
  }

  private _context: XrmFxContext;
  public get context() {
    if (this._context == null) {
      this._context = new XrmFxContextImpl(this.eventContext);
    }

    return this._context;
  }

  public ApiInit(entities: Entity[]) {
    this.xrmFakedApiContext.initialize(entities);
  }
}
