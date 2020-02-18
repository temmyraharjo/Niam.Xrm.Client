import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContext } from '../lib/interfaces/xrm-fx-context';
import { XrmFxContextImpl } from '../lib/xrm-fx-context-impl';
import { AttributeMetadata, EntityMetadata } from '../lib/data';
import { XrmFakedContext } from 'fakexrmeasy';

export interface AttributeInForm<K> {
  attributeName: K;
  isDisabled: boolean;
}

export class FakedWebContext implements Xrm.WebApi {
  constructor(private context: XrmFakedContext) {}

  isAvailableOffline(entityLogicalName: string): boolean {
    throw new Error('Method not implemented.');
  }
  online: Xrm.WebApiOnline;
  offline: Xrm.WebApiOffline;
  createRecord(
    entityLogicalName: string,
    record: any
  ): Xrm.Async.PromiseLike<Xrm.CreateResponse> {
    //return this.context.addEntity()
    throw new Error('Method not implemented.');
  }
  deleteRecord(
    entityLogicalName: string,
    id: string
  ): Xrm.Async.PromiseLike<string> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  updateRecord(
    entityLogicalName: string,
    id: string,
    data: any
  ): Xrm.Async.PromiseLike<any> {
    throw new Error('Method not implemented.');
  }
}

export class BaseTest<T> {
  private initialEntity: T;
  public webContext = new XrmFakedContext('v9.0', 'http://localhost', true);

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
    return XrmMockGenerator.getEventContext();
  }

  private _context: XrmFxContext;
  public get context() {
    if (this._context == null) {
      this._context = new XrmFxContextImpl(this.eventContext);
    }

    return this._context;
  }
}
