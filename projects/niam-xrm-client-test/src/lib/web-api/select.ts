import { Entity, WebApiOption } from '../definitions';

export function select(entity: Entity, webOption: WebApiOption): Entity {
  const valid = webOption && webOption.select && webOption.select !== '';
  if (!valid) return entity;

  const entityAttributes = Object.keys(entity);
  const result = webOption.select
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
