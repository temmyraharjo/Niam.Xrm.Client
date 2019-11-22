export interface FxAttribute {
    get(attributeName: string) : Xrm.Attributes.Attribute;

    getValue<T>(attribute: string): T;
    setValue<T>(attributeName: string, value: T) : FxAttribute;

    getRequiredLevel(attributeName: string): Xrm.Attributes.RequirementLevel;
    setRequiredLevel(attributeName: string, 
        requiredLevel: Xrm.Attributes.RequirementLevel): FxAttribute;
}
