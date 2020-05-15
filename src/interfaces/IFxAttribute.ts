import { IFxContext } from './IFxContext';

export interface IFxAttribute<Entity> {
    fxContext: IFxContext;

    getAttribute<Attribute extends keyof Entity>(attribute: Attribute): 
        Xrm.Attributes.Attribute;
    setValue<Attribute extends keyof Entity>(attribute: Attribute, 
        value: Entity[Attribute]);
    getValue<Attribute extends keyof Entity>(attribute: Attribute): 
        Entity[Attribute];
    getRequiredLevel<Attribute extends keyof Entity>(attribute: Attribute): 
        Xrm.Attributes.RequirementLevel;
    setRequiredLevel<Attribute extends keyof Entity>(attribute: Attribute, 
        requirementLevel: Xrm.Attributes.RequirementLevel);
}


