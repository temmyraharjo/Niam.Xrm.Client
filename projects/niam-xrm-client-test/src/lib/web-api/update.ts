import { Entity } from '../definitions';

export function update(source: Entity, target: Entity): Entity {
  const excludeAttributes = ['id', 'logicalName'];
  const attributes = Object.keys(target).filter(
    (attribute) =>  excludeAttributes.indexOf(attribute) === -1
  );
  for (const attribute of attributes) {
    source[attribute] = target[attribute];
  }

  return source;
}
