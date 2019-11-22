import { XrmMockGenerator } from 'xrm-mock';
import { Fx } from '../../src/lib/fx';

describe('Fx Tests', () => {
    let eventContext: Xrm.Events.EventContext;

    beforeEach(() => {
        XrmMockGenerator.initialise();
        XrmMockGenerator.Attribute.createString('new_name', '');
        XrmMockGenerator.Attribute.createNumber('new_amount', null);

        eventContext = XrmMockGenerator.getEventContext();
    });

    it('Instance FxAttribute', () => {
        const fx = new Fx(eventContext);
        expect(fx.attributes).toBeTruthy();
        expect(fx.controls).toBeTruthy();
    });
});