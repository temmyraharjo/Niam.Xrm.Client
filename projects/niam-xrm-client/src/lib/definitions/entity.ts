export type EntityAttributeTypes = number | string | boolean | Date | Xrm.LookupValue[];

export type Entity = {
  [name: string]: EntityAttributeTypes;
}