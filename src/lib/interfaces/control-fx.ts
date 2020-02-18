export interface ControlFx<T> {
  getControl<Field extends Extract<keyof T, string>>(
    attributeName: Field
  ): Xrm.Controls.Control;
  
  setDisabled<Field extends Extract<keyof T, string>>(
    attributeName: Field,
    isDisabled: boolean
  ): void;

  getDisabled<Field extends Extract<keyof T, string>>(
    attributeName: Field
  ): boolean;
}
