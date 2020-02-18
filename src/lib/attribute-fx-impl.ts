import { AttributeFx } from './interfaces/attribute-fx';
import { XrmFxContext } from './interfaces/xrm-fx-context';

export class AttributeFxImpl<T> implements AttributeFx<T> {
  private attributes: {
    [attributeName: string]: Xrm.Attributes.Attribute;
  } = {};

  private get form(): Xrm.FormContext {
    return this.xrmFxContext.formContext;
  }

  constructor(private xrmFxContext: XrmFxContext) {}

  getAttribute<Field extends Extract<keyof T, string>>(
    attributeName: Field
  ): Xrm.Attributes.Attribute {
    if (!this.attributes[attributeName]) {
      this.attributes[attributeName] = this.form.getAttribute(attributeName);
    }

    return this.attributes[attributeName];
  }

  set<Field extends Extract<keyof T, string>>(
    attributeName: Field,
    value: T[Field]
  ) {
    const attribute = this.getAttribute(attributeName);
    if (!attribute) return;

    attribute.setValue(value);
  }

  get<Field extends Extract<keyof T, string>>(attributeName: Field): T[Field] {
    const attribute = this.getAttribute(attributeName);

    return !attribute ? null : attribute.getValue();
  }
}
