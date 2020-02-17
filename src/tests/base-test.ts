import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContext } from '../lib/interfaces/xrm-fx-context';
import { XrmFxContextImpl } from '../lib/xrm-fx-context-impl';
import { AttributeMetadata } from '../lib/data';

export class BaseTest {
  public get xrmMock() {
    return XrmMockGenerator;
  }

  constructor(attributes: string[], attributesMetadata: AttributeMetadata[]) {
    this.xrmMock.initialise();

    attributes.forEach(attr => {
      const metadata = attributesMetadata.filter(e => e.attributeName == attr);
      if (metadata.length == 0) return;

      const attributeMetadata = metadata[0];
      const dataType = attributeMetadata.dataType;
      const attributeName = attr;
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
