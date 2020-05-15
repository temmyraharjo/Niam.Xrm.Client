import { IFxControl } from '../interfaces/IFxControl';
import { IFxContext } from '../interfaces/IFxContext';
import { FormControlType } from '../util';
import { IEntityMetadata } from '../interfaces/IEntityMetadata';

export class FxControl<Entity> implements IFxControl<Entity> {
    private get formContext() {
        return this.fxContext.formContext;
    }

    constructor(public fxContext: IFxContext,
        public entityMetadata: IEntityMetadata) { }

    getControl<Attribute extends keyof Entity>(attribute: Attribute) {
        const attributeName = attribute.toString();
        const attributeMetadata = this.entityMetadata.
            attributesMetadata.find(e => e.name == attributeName);
        if (attributeMetadata == null) {
            throw new
                Error(`AttributeMetadata not found for attribute ${attributeName}`);
        }
        const control = this.formContext.getControl(attributeName);
        switch (attributeMetadata.type) {
            case 'ILookupValue[]':
                return this.getLookupControl(control);
            case 'string':
                return this.getStringControl(control);
        }
        return this.getLookupControl(control);
    }

    getStringControl(control: Xrm.Controls.Control): Xrm.Controls.StringControl {
        return control as Xrm.Controls.StringControl;
    }

    getLookupControl(control: Xrm.Controls.Control): Xrm.Controls.LookupControl {
        return control as Xrm.Controls.LookupControl;
    }
}