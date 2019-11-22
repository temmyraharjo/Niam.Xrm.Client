import { FxAttribute } from './interfaces/fx-attribute';
import { Base } from './base';

export class XrmAttribute extends Base implements FxAttribute {
  attributes: { name: string; attribute: Xrm.Attributes.Attribute }[] = [];
  get(attributeName: string): Xrm.Attributes.Attribute {
    const filter = this.attributes.filter(attr => attr.name === attributeName);
    if (filter.length > 0) return filter[0].attribute;

    const attributeObj = this.formContext.getAttribute(attributeName);
    const value = {
      name: attributeName,
      attribute: attributeObj
    };
    this.attributes.push(value);

    return value.attribute;
  }

  getValue<T>(attribute: string | Xrm.Attributes.Attribute): T {
    if(typeof attribute === "string") {
      return this.get(attribute).getValue() as T;
    }

    return attribute.getValue() as T;
  }

  setValue<T>(attributeName: string, value: T): FxAttribute {
    this.get(attributeName).setValue(value);

    return this;
  }

  setRequiredLevel(attributeName: string, requiredLevel: Xrm.Attributes.RequirementLevel) {
    this.get(attributeName).setRequiredLevel(requiredLevel);
    
    return this;
  }

  getRequiredLevel(attributeName: string): Xrm.Attributes.RequirementLevel {
    return this.get(attributeName).getRequiredLevel();
  }
}
