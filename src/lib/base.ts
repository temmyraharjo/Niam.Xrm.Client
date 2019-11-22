export class Base {
    constructor(public eventContext: Xrm.Events.EventContext) { }

    private _formContext: Xrm.FormContext;
    protected get formContext() {
      if(this._formContext == null){
        this._formContext = this.eventContext.getFormContext();
      }
  
      return this._formContext;
    }
}