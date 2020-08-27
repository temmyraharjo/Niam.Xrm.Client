import { Entity, WebEntity, WebApiOption } from '../definitions';
import { select } from './select';

type metadata = {
  isExpand: boolean;
  selectAttributes: string;
  entity: string;
};

function getMetadataExpand(webOption: WebApiOption): metadata[] {
  const isExpandValid =
    webOption.expand && webOption.expand.indexOf('($select') > -1;
  if (!isExpandValid)
    return [{ isExpand: false, selectAttributes: '', entity: '' }];

  const result: metadata[] = [];
  const data = webOption.expand.split(')');

  for (const row of data) {
    const datum = row.split('($select=');
    const entityAttribute = datum[0].replace(',', '');
    let attributes = datum[1];

    result.push({
      entity: entityAttribute,
      isExpand: true,
      selectAttributes: attributes,
    });
  }

  return result;
}

function setForObject(
  temp: Entity,
  attribute: string,
  value: any,
  metadatas: metadata[]
) {
  if (value === {}) return;

  const metadata = metadatas.find((e) => e.entity === attribute);
  if (!metadata) return;
  if (!metadata.isExpand) return;

  const entityValue = select(value as WebEntity, {
    select: metadata.selectAttributes,
  });

  temp[attribute] = entityValue;
}

function setForArray(
  temp: Entity,
  attribute: string,
  value: any,
  metadatas: metadata[]
) {
  if (!Array.isArray(value)) return;

  const resultArray: WebEntity[] = [];
  const metadata = metadatas.find((e) => e.entity === attribute);
  if (!metadata) return;
  if (!metadata.isExpand) return;
  var arrayValue = value as WebEntity[];

  for (const record of arrayValue) {
    const entityValue = select(record, {
      select: metadata.selectAttributes,
    });

    resultArray.push(entityValue);
  }
  temp[attribute] = resultArray;
}

function filterEntity(metadatas: metadata[], entity: Entity): Entity {
  let temp: Entity = {
    id: entity.id,
    logicalName: entity.logicalName,
  };
  const attributes = Object.keys(entity);
  for (const attribute of attributes) {
    const value = entity[attribute];
    const valueType = typeof value;
    if (valueType !== 'object') {
      temp[attribute] = value;
      continue;
    }
    setForObject(temp, attribute, value, metadatas);
    setForArray(temp, attribute, value, metadatas);
  }
  return temp;
}

export function expand(entities: Entity[], webOption: WebApiOption): Entity[] {
  const resultEntities: Entity[] = [];
  const metadatas = getMetadataExpand(webOption);

  for (const entity of entities) {
    let temp: Entity = filterEntity(metadatas, entity);

    resultEntities.push(temp);
  }
  return resultEntities;
}
