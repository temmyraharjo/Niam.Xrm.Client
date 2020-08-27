import { Entity, WebApiOption, WebEntity } from '../definitions';

export function select<T extends WebEntity>(
  entity: T,
  webOption: WebApiOption
): T;
export function select<T extends Entity>(
  entity: Entity,
  webOption: WebApiOption
): T {
  const valid = webOption && webOption.select && webOption.select !== '';
  if (!valid) return entity as T;

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
    }, {} as WebEntity);

  if (entity.logicalName) {
    result.id = entity.id;
    result.logicalName = entity.logicalName;
  }

  return result as T;
}
