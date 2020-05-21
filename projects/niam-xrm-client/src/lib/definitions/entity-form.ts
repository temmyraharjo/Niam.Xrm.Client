export type EntityFormControlTypes = 
  Xrm.Controls.GridControl |
  Xrm.Controls.IframeControl |
  undefined |
  null;

export type EntityForm = {
  [name: string]: EntityFormControlTypes;
}
