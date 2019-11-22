import { XrmMockGenerator } from 'xrm-mock';

type lookupTypes = Xrm.LookupValue | Xrm.LookupValue[]
type optionSetType = Xrm.OptionSetValue;

export class XrmTest {
    public xrmMock = XrmMockGenerator;

    public get eventContext(): Xrm.Events.EventContext {
        return this.xrmMock.getEventContext();
    }

    public get formContext(): Xrm.FormContext {
        return this.eventContext.getFormContext();
    }

    public getAttribute(attribute: string) : Xrm.Attributes.Attribute {
        return this.formContext.getAttribute(attribute);
    }

    constructor() {
        this.xrmMock.initialise();
    }

    public createAttribute<T extends boolean | Date | lookupTypes | 
        number | string | optionSetType>(name: string, value: T) {
            const lookupValue = value as lookupTypes;
            const optionValue = value as optionSetType;
            if (typeof value === 'string') {
                this.xrmMock.Attribute.createString(name, value);
            }else if(typeof value === 'number') {
                this.xrmMock.Attribute.createNumber(name, value);
            }else if(value instanceof Date){
                this.xrmMock.Attribute.createDate(name, value);
            }else if(lookupValue) {
                this.xrmMock.Attribute.createLookup(name, lookupValue);
            }else if(optionValue){
                this.xrmMock.Attribute.createOptionSet(name, optionValue.value);
            }
    }

    public newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}