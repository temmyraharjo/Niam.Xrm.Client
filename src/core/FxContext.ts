import { IFxContext } from "../interfaces/IFxContext";

export class FxContext implements IFxContext {
    constructor(public eventContext: Xrm.Events.EventContext) { }

    get formContext(): Xrm.FormContext {
        return this.eventContext.getFormContext();
    };
}
