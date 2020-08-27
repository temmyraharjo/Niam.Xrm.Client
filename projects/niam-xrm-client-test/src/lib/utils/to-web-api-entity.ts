import { Entity, WebEntity } from '../definitions';

export function toWebApiEntity(entity: Entity): WebEntity {
    const excludeAttributes = ['id', 'logicalName'];
    const attributes = Object.keys(entity).filter(
      (attribute) =>  excludeAttributes.indexOf(attribute) === -1
    );

    const result: WebEntity = {};
    for(const attribute of attributes){
        result[attribute] = entity[attribute];
    }

    return result;
}
