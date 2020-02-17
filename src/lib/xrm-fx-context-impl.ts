import { XrmFxContext } from './interfaces/xrm-fx-context';

export class XrmFxContextImpl implements XrmFxContext {
  private _formContext: Xrm.FormContext;
  get formContext(): Xrm.FormContext {
    if (this._formContext == null) {
      this._formContext = this.eventContext.getFormContext();
    }

    return this._formContext;
  }

  constructor(public eventContext: Xrm.Events.EventContext) {}
}
