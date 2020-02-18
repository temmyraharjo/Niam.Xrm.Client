import { XrmFx } from './interfaces/xrm-fx';
import { XrmFxContext } from './interfaces/xrm-fx-context';
import { AttributeFx } from './interfaces/attribute-fx';
import { XrmFxContextImpl } from './xrm-fx-context-impl';
import { AttributeFxImpl } from './attribute-fx-impl';
import { ControlFx } from './interfaces/control-fx';
import { ControlFxImpl } from './control-fx-impl';

export class XrmFxImpl<T> implements XrmFx<T> {
  constructor(public eventContext: Xrm.Events.EventContext) {}

  private _context: XrmFxContext;
  get context(): XrmFxContext {
    if (this._context == null) {
      this._context = new XrmFxContextImpl(this.eventContext);
    }
    
    return this._context;
  }

  private _attributeFx: AttributeFx<T>;
  get attributeFx(): AttributeFx<T> {
    if (this._attributeFx == null) {
      this._attributeFx = new AttributeFxImpl(this.context);
    }

    return this._attributeFx;
  }

  private _controlFx: ControlFx<T>;
  get controlFx() : ControlFx<T> {
    if(this._controlFx == null) {
      this._controlFx = new ControlFxImpl<T>(this.context);
    }

    return this._controlFx;
  }
}
