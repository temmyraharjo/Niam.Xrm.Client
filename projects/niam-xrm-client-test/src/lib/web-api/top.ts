import { Entity, WebApiOption } from '../definitions';

export function top(entities: Entity[], webOption: WebApiOption): Entity[] {
  if (!webOption.top) return entities;

  const result = [];
  const maxIndex = Number(webOption.top) - 1;
  for (let i = 0; i < entities.length; i++) {
      result.push(entities[i]);

      if(i === maxIndex) break;
  }
  return result;
}
