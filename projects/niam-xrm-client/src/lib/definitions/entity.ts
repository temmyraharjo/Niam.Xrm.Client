export type EntityAttributeTypes = 
  number 
  | string 
  | boolean 
  | Date 
  | Xrm.LookupValue[]
  | undefined
  | null;

export type Entity = {
  [name: string]: EntityAttributeTypes;
}