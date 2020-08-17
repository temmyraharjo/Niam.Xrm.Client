import { EntityMetadata, AttributeMetadata } from '../definitions';

export function getEntityMetadata(
  entitiesMetadata: EntityMetadata[],
  entityLogicalName: string
): EntityMetadata {
  const result = entitiesMetadata.find(
    (e) => e.logicalName === entityLogicalName
  );
  if (!result)
    throw new Error(`No entity metadata found for '${entityLogicalName}'`);
  return result;
}

export function getAttributeMetadata(
  entityMetadata: EntityMetadata,
  attributeName: string, isThrow = true
): AttributeMetadata {
  const result = entityMetadata.attributes.find(
    (e) => e.logicalName === attributeName
  );
  if (!result && isThrow) {
    throw new Error(
      `No attribute metadata found for '${attributeName}' in '${entityMetadata.logicalName}'`
    );
  }

  return result ?? null;
}
