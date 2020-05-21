export type EntityAttributeValue = 
  number |
  string | 
  boolean |
  Date |
  Xrm.LookupValue[];

export type Entity = {
  [name: string]: EntityAttributeValue;
}