import { ControlFx } from './interfaces/control-fx';
import { XrmFxContext } from './interfaces/xrm-fx-context';

export class ControlFxImpl<T> implements ControlFx<T> {
  private controls: {
    [attributeName: string]: Xrm.Controls.Control;
  } = {};

  private get form(): Xrm.FormContext {
    return this.xrmFxContext.formContext;
  }

  constructor(private xrmFxContext: XrmFxContext) {}

  getControl<Field extends Extract<keyof T, string>>(
    attributeName: Field
  ): Xrm.Controls.Control {
    if (!this.controls[attributeName]) {
      this.controls[attributeName] = this.form.getControl(attributeName);
    }

    return this.controls[attributeName];
  }

  setDisabled<Field extends Extract<keyof T, string>>(
    attributeName: Field,
    isDisabled: boolean
  ): void {
    const control = this.getControl(attributeName);
    if (control == null) return;

    const standardControl = control as Xrm.Controls.StandardControl;
    if (standardControl == null) return;

    standardControl.setDisabled(isDisabled);
  }

  getDisabled<Field extends Extract<keyof T, string>>(
    attributeName: Field
  ): boolean {
    const control = this.getControl(attributeName);
    if (control == null) return false;

    const standardControl = control as Xrm.Controls.StandardControl;
    if (standardControl == null) return false;

    return standardControl.getDisabled();
  }
}
