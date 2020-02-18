export interface AttributeFx<T> {
  getAttribute<Field extends Extract<keyof T, string>>(attributeName: Field): Xrm.Attributes.Attribute;
  set<Field extends Extract<keyof T, string>>(
    attributeName: Field,
    value: T[Field]
  );
  get<Field extends Extract<keyof T, string>>(attributeName: Field): T[Field];
}
