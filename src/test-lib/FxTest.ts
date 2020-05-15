import { IFxTest } from './interfaces/IFxTest';
import { XrmMockGenerator } from 'xrm-mock';
import { IEntityMetadata } from '../interfaces/IEntityMetadata';
import { IFxContext } from '../interfaces/IFxContext';
import { FxContext } from '../core/FxContext';

export class FxTest<T> implements IFxTest<T> {
    private xrmMock: XrmMockGenerator;
    public get fxContext(): IFxContext {
        const context = new FxContext(XrmMockGenerator.eventContext);
        return context;
    }

    constructor(public entityMetadata: IEntityMetadata) { 
        XrmMockGenerator.initialise();
    }
    
    init(data: T) {
        for (const attributeMetadata of this.entityMetadata.attributesMetadata) {
            const value = data[attributeMetadata.name];

            if (attributeMetadata == null) {
                continue;
            }

            switch (attributeMetadata.type) {
                case 'Date':
                    XrmMockGenerator.Attribute.
                        createDate(attributeMetadata.name, value);
                    break;
                case 'number':
                    XrmMockGenerator.Attribute.
                        createNumber(attributeMetadata.name, value);
                    break;
                case 'ILookupValue[]':
                    XrmMockGenerator.Attribute.
                        createLookup(attributeMetadata.name, value);
                    break;
                case 'IOptionSetValue':
                    XrmMockGenerator.Attribute.
                        createOptionSet(attributeMetadata.name, value);
                    break;
                case 'string':
                    XrmMockGenerator.Attribute.
                        createString(attributeMetadata.name, value);
                    break;
            }
        }
    }
}