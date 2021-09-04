import {
    Entity,
    EntityMetadata,
    KeyOf,
    LookupAttributeMetadata,
    OwnerAttributeMetadata,
    ComparasionOperator,
    LogicalOperator
  } from '../definitions';
  import { getAttributeMetadata } from './helper';

export class Filter<T> {
    not?: boolean;
    attribute: KeyOf<T>;
    operator: typeof ComparasionOperator;
    logicalOperator?: typeof LogicalOperator;
}

export function filter<T extends Entity>(entityMetadata: EntityMetadata, attributes: KeyOf<T>[]): string {
    return '';
}