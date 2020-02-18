import { BaseTest } from '../src/tests/base-test';
import { Order, ORDER_METADATA } from '../src/entities';
import { ApiFx } from '../src/lib/interfaces/api-fx';
import { ApiFxImpl } from '../src/api-fx-impl';

describe('ApiFxImpl Tests', () => {
    let baseTest: BaseTest<Order>;
    let apiFx: ApiFx;
    let orderMetadata = ORDER_METADATA;
    beforeAll(() => {
        baseTest = new BaseTest<Order>();
        apiFx = new ApiFxImpl(null);
    });

    it('ApiFx create entity', () => {
        apiFx.create(orderMetadata, {
            'name': 'sample order',
            'creditonhold': false,
            'revenue': 10000
        }).then(success=> {
            expect(success.id).not.toBeNull();
        })
    });

});