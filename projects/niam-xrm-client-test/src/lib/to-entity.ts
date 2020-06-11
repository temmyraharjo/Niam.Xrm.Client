import { Entity } from './definitions/entity';

export function toEntity(
  entityLogicalName: string,
  id: string,
  record: any
): Entity {
  const attributes = Object.keys(record);
  const result: Entity = {
    logicalName: entityLogicalName,
    id: id,
  };

  for (const attribute of attributes) {
    result[attribute] = record[attribute];
  }

  return result;
}
