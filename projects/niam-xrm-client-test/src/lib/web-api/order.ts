import { Entity, WebApiOption } from '../definitions';

enum orderBy {
  asc,
  desc,
}

export function order(
  entities: Entity[],
  webApiOption: WebApiOption
): Entity[] {
  if(!webApiOption.orderby) return entities;
  
  const orders = webApiOption.orderby.split(',').map((text) => {
    const commands = text.split(' ');
    return {
      attributeName: commands[0],
      orderBy:
        commands.length > 1
          ? commands[1] === 'asc'
            ? orderBy.asc
            : orderBy.desc
          : orderBy.asc,
    };
  });

  for (const order of orders) {
    const isAsc = order.orderBy === orderBy.asc;
    entities = entities.sort((a: Entity, b: Entity) => {
      const aValue = a[order.attributeName];
      const bValue = b[order.attributeName];

      if (aValue === bValue) return 0;
      return isAsc ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
  }

  return entities;
}
