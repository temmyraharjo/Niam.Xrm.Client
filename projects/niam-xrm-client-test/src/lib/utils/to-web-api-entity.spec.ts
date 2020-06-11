import { expect } from 'chai';
import 'mocha';
import { Entity } from '../definitions/entity';
import { toWebApiEntity } from './to-web-api-entity';

describe('to-web-api-object', () => {
    it('can convert to WebApi object', () => {
        const record: Entity = {
            logicalName: 'entity',
            id: 'id',
            name: 'A. Datum Corporation (sample)',
            'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue':
              'Default Value',
        };

        const result = toWebApiEntity(record);
        expect(result['id']).to.undefined;
        expect(result['logicalName']).to.undefined;
        expect(result['name']).to.not.null;
    });
});