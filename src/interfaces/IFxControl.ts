import { IFxContext } from './IFxContext';
import { FormControlType } from '../util';
import { IEntityMetadata } from './IEntityMetadata';

export interface IFxControl<Entity> {
    fxContext: IFxContext;
    entityMetadata: IEntityMetadata;

    getControl<Attribute extends keyof Entity>(attribute: Attribute);
}
