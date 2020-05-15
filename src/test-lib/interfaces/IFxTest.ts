import { IEntityMetadata } from '../../interfaces/IEntityMetadata';
import { IFxContext } from '../../interfaces/IFxContext';

export interface IFxTest<Entity> {
    entityMetadata: IEntityMetadata;
    init(data: Entity);

    fxContext: IFxContext;
}