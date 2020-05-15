import { IEntityMetadata } from "./interfaces/IEntityMetadata";
import { IAttributeMetadata } from "./interfaces/IAttributeMetadata";

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export function createMetadata<T>(logicalName: string,
    attributesMetadata: IAttributeMetadata[]): IEntityMetadata {
    return {
        logicalName: logicalName,
        attributesMetadata: attributesMetadata
    }
}

export type FormControlType = Xrm.Controls.Control | Xrm.Controls.StandardControl |
  Xrm.Controls.AutoLookupControl | Xrm.Controls.LookupControl |
  Xrm.Controls.OptionSetControl | Xrm.Controls.DateControl |
  Xrm.Controls.QuickFormControl | Xrm.Controls.GridControl |
  Xrm.Controls.FramedControl | Xrm.Controls.NumberControl |
  Xrm.Controls.ProcessControl | Xrm.Controls.StringControl |
  Xrm.Controls.SilverlightControl;