import { Base } from './base';
import { FxCore } from './interfaces/fx-core';
import { FxAttribute } from './interfaces/fx-attribute';
import { FxControl } from './interfaces/fx-control';
import { XrmAttribute } from './xrm-attribute';
import { XrmControl } from './xrm-control';

export class Fx extends Base implements FxCore {
  constructor(
    eventContext: Xrm.Events.EventContext,
    attributes: FxAttribute = null,
    controls: FxControl = null
  ) {
    super(eventContext);

    if (attributes != null) {
      this._attributes = attributes;
    }

    if (controls != null) {
      this._controls = controls;
    }
  }

  private _attributes: FxAttribute;
  get attributes(): FxAttribute {
    if (this._attributes == null) {
      this._attributes = new XrmAttribute(this.eventContext);
    }

    return this._attributes;
  }

  private _controls: FxControl;
  get controls(): FxControl {
    if (this._controls == null) {
      this._controls = new XrmControl(this.eventContext);
    }

    return this._controls;
  }
}
