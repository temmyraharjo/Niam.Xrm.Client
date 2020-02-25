import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContext } from '../lib/interfaces/xrm-fx-context';
import { XrmFxContextImpl } from '../lib/xrm-fx-context-impl';
import { AttributeMetadata, EntityMetadata } from '../lib/data';
import { XrmFakedContext, Entity, IEntity } from 'fakexrmeasy';
import * as Enumerable from 'linq';

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
  constructor(private webContext: XrmFakedContexClient) {}

  isAvailableOffline(entityLogicalName: string): boolean {
    throw new Error('Method not implemented.');
  }
  online: Xrm.WebApiOnline;
  offline: Xrm.WebApiOffline;
  createRecord(
    entityLogicalName: string,
    record: any
  ): Xrm.Async.PromiseLike<Xrm.CreateResponse> {
    const result = new XrmPromise<Xrm.CreateResponse>(resolve => {
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
    return new XrmPromise((resolve, rejects) => {
      this.webContext.removeEntity(entityLogicalName, id);
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
    const result = this.webContext.retrieveMultipleRecords(
      entityLogicalName,
      options,
      maxPageSize
    );
    const multipleResult: Xrm.RetrieveMultipleResult = {
      entities: result,
      nextLink: ''
    };
    return new XrmPromise(resolve => {
      resolve(multipleResult);
    });
  }

  updateRecord(
    entityLogicalName: string,
    id: string,
    record: any
  ): Xrm.Async.PromiseLike<any> {
    const result = new XrmPromise(resolve => {
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

export class XrmFakedContexClient extends XrmFakedContext {
  getDictionary(param?: string) {
    const queryData = (param || '').split('&');
    const dictionary = {};

    for (const word of queryData) {
      if (word.indexOf('=') == -1) continue;
      const splitParam = word.split('=');
      dictionary[splitParam[0]] = splitParam[1];
    }

    return dictionary;
  }

  getRecords(entityName: string, options?: string) {
    const data = this.getAllData();
    const paramDictionary = this.getDictionary(options);

    if (!data.containsKey(entityName)) return [];

    var entityDictionary = data.get(entityName);
    var records = entityDictionary.values();

    //from
    //join / expands
    //where clause
    //projection
    //orderby

    var columnSet =
      paramDictionary['select'] != null ? paramDictionary['select'] : null;
    var filter =
      paramDictionary['filter'] != null ? paramDictionary['filter'] : null;
    var topCount =
      paramDictionary['top'] != null ? paramDictionary['top'] : null;

    var queryeable = Enumerable.from(records)
      //.join()
      .where((e, index) => {
        return paramDictionary['id'] && paramDictionary['id'] !== ''
          ? paramDictionary['id'] == e.id.toString()
          : true;
      }) //Single id filter if retrieving single record
      .where((e, index) => {
        return e.satisfiesFilter(filter);
      })
      .select((e, index) => {
        return e.projectAttributes(columnSet);
      });
    //orderby

    if (topCount) {
      queryeable = queryeable.take(topCount);
    }

    var arrayResult = queryeable.toArray();

    var result: Array<IEntity> = [];
    for (var i = 0; i < arrayResult.length; i++) {
      result.push(arrayResult[i]);
    }

    return result;
  }

  retrieveMultipleRecords(
    entityName: string,
    options?: string,
    maxPageSize?: number
  ) {
    const data = this.getRecords(entityName, options);

    var entities = [];
    for (var i = 0; i < data.length; i++) {
      var odataEntity = data[i].toXrmEntity();
      odataEntity['@odata.etag'] = 'W/"' + i.toString() + '"';
      entities.push(odataEntity);
    }

    return entities;
  }

  protected getPluralSetName(entityName: string): string {
    var ending = entityName.slice(-1);

    if (ending == 'y')
      return entityName.substring(0, entityName.length - 1) + 'ies';

    if (ending == 's')
      return entityName.substring(0, entityName.length - 1) + 'es';

    return entityName + 's';
  }
}

export class BaseTest<T> {
  private initialEntity: T;

  public xrmFakedApiContext = new XrmFakedContexClient(
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
