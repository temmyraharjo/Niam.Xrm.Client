import { Entity } from './definitions/entity';

export function select(entity: Entity, select: string): Entity {
  if (!select) return entity;
  if (select === '') return entity;
  
  const entityAttributes = Object.keys(entity);
  const result = select
    .split(',')
    .map((e) => e.trim())
    .filter((e) => e)
    .reduce((e, attribute) => {
      const filterAttributes = entityAttributes.filter(
        (e) => e.indexOf(attribute) > -1
      );
      if (!filterAttributes) return e;

      for (const entityAttribute of filterAttributes) {
        e[entityAttribute] = entity[entityAttribute];
      }

      return e;
    }, {} as Entity);

  result.id = entity.id;
  result.logicalName = entity.logicalName;

  return result;
}
