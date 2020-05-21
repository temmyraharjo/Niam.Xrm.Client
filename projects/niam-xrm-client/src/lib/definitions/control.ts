export type XrmAttributeControl<TV> =
    TV extends string ? Xrm.Controls.StringControl :
    TV extends number ? Xrm.Controls.NumberControl :
    TV extends boolean ? Xrm.Controls.StandardControl :
    TV extends Date ? Xrm.Controls.DateControl :
    TV extends Xrm.LookupValue[] ? Xrm.Controls.LookupControl :
    TV extends Xrm.OptionSetValue ? Xrm.Controls.OptionSetControl :
    Xrm.Controls.StandardControl;