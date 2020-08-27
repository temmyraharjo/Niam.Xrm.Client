export type EntityAttributeValue = string | number | boolean | null;

export type WebEntity = {
  [name: string]: EntityAttributeValue | WebEntity | WebEntity[];
}

export interface Entity extends WebEntity {
  logicalName: string;
  id: string;
};
