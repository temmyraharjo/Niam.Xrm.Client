import { EntityMetadata, Entity } from '../../main';
import { getAttributeMetadata, getEntityMetadata } from './helper';

export type WebApiValue = string | number | boolean | null;

interface Attribute {
  name: string;
  value: WebApiValue;
}

export interface WebApiEntity {
  [name: string]: WebApiValue;
}

export function toWebApiEntityRequest(
  entitiesMetadata: EntityMetadata[],
  entityLogicalName: string,
  entity: Entity
) {
  const entityMetadata = entitiesMetadata.find(
    (e) => e.logicalName === entityLogicalName
  );
  if (!entityMetadata)
    throw new Error(`No entity metadata found for '${entityLogicalName}'`);
  const attributeNames = Object.keys(entity);
  const result = attributeNames
    .map((attributeName) =>
      getAttribute(entityMetadata, entity, attributeName, entitiesMetadata)
    )
    .reduce((e, attribute) => {
      e[attribute.name] = attribute.value;
      return e;
    }, {} as WebApiEntity);

  return result;
}

function getAttribute(
  entityMetadata: EntityMetadata,
  entity: Entity,
  attributeName: string,
  entitiesMetadata: EntityMetadata[]
): Attribute {
  const attributeMetadata = getAttributeMetadata(entityMetadata, attributeName);

  const value = entity[attributeName];
  switch (attributeMetadata.attributeType) {
    case 'datetime':
      const dateValue = value as Date;
      return {
        name: attributeMetadata.logicalName,
        value: dateValue.toISOString(),
      };
    case 'owner':
    case 'lookup':
      const lookupValue = value as Xrm.LookupValue[];
      const lookupValueString =
        lookupValue.length > 0
          ? getLookupValue(entitiesMetadata, lookupValue[0])
          : null;
      const lookupName = lookupValueString
        ? attributeMetadata.logicalName + '@odata.bind'
        : attributeMetadata.logicalName;
      return {
        name: lookupName,
        value: lookupValueString,
      };
    default:
      var defaultValue = value as WebApiValue;
      return { name: attributeMetadata.logicalName, value: defaultValue };
  }
}

function getLookupValue(
  entitiesMetadata: EntityMetadata[],
  lookupValue: Xrm.LookupValue
): string {
  const entityMetadata = getEntityMetadata(
    entitiesMetadata,
    lookupValue.entityType
  );

  return `/${entityMetadata.entitySetName}(${lookupValue.id})`;
}
