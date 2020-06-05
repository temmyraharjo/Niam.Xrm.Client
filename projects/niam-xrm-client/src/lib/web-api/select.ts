import {
  Entity,
  EntityMetadata,
  KeyOf,
  LookupAttributeMetadata,
  OwnerAttributeMetadata
} from '../definitions';

export function select<T extends Entity>(entityMetadata: EntityMetadata, attributes: KeyOf<T>[]): string {
  const selectParts = attributes.map(name => {
    const attributeMetadata = entityMetadata.attributes.find(md => md.logicalName === name);
    if (!attributeMetadata) {
      throw new Error(`No attribute metadata found for '${name}'`);
    }

    switch (attributeMetadata.attributeType) {
      case 'lookup': return getLookupQuerySelect(attributeMetadata as LookupAttributeMetadata);
      case 'owner': return getOwnerQuerySelect(attributeMetadata as OwnerAttributeMetadata);
      default: return name;
    }
  });

  return `$select=${selectParts.join(',')}`;
}

function getLookupQuerySelect(metadata: LookupAttributeMetadata) {
  return `_${metadata.logicalName}_value`;
}

function getOwnerQuerySelect(metadata: OwnerAttributeMetadata) {
  return `_${metadata.logicalName}_value`;
}