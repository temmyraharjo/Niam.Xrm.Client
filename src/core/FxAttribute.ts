import { IFxAttribute } from '../interfaces/IFxAttribute';
import { IFxContext } from '../interfaces/IFxContext';

export class FxAttribute<Entity> implements IFxAttribute<Entity> {
    private cacheAttribute: {
        [key: string]: Xrm.Attributes.Attribute
    } = {};

    constructor(public fxContext: IFxContext) { }

    private get formContext() {
        return this.fxContext.formContext;
    }

    getRequiredLevel<Attribute extends keyof Entity>(attribute: Attribute): 
        Xrm.Attributes.RequirementLevel{
        return this.getAttribute(attribute).getRequiredLevel();
    }

    setRequiredLevel<Attribute extends keyof Entity>(attribute: Attribute, 
        requirementLevel: Xrm.Attributes.RequirementLevel){
        return this.getAttribute(attribute).setRequiredLevel(requirementLevel);
    }

    getAttribute<Attribute extends keyof Entity>(attribute: Attribute) {
        const attributeName = attribute.toString();
        let cache = this.cacheAttribute[attributeName];
        if (cache == null) {
            cache = this.cacheAttribute[attributeName] =
                this.formContext.getAttribute(attributeName);
        }

        return cache;
    }

    getValue<Attribute extends keyof Entity>(attribute: Attribute):
        Entity[Attribute] {
        const value = this.getAttribute(attribute).getValue();
        return value;
    }

    setValue<Attribute extends keyof Entity>(attribute: Attribute,
        value: Entity[Attribute]) {
        this.getAttribute(attribute).setValue(value);
    }
}
