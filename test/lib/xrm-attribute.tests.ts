import { XrmMockGenerator } from 'xrm-mock';
import { XrmAttribute } from '../../src/lib/xrm-attribute';

describe('XrmAttribute Tests', () => {
    let eventContext: Xrm.Events.EventContext;

    beforeEach(() => {
        XrmMockGenerator.initialise();
        XrmMockGenerator.Attribute.createString('new_name', '');
        XrmMockGenerator.Attribute.createNumber('new_amount', null);

        eventContext = XrmMockGenerator.getEventContext();
    });

    it('GetAttribute should valid', () => {
        const fxAttribute = new XrmAttribute(eventContext);
        fxAttribute.get('new_name');
        fxAttribute.get('new_amount');
        expect(fxAttribute.attributes.length).toBe(2);
    });

    it('check SetValue and GetValue should valid', () => {
        const fxAttribute = new XrmAttribute(eventContext);
        fxAttribute.setValue('new_name', 'Temmy')
            .setValue('new_amount', 1000);

        const name = fxAttribute.getValue<string>('new_name');
        expect(name).toEqual('Temmy');

        const amount = fxAttribute.getValue<number>('new_amount');
        expect(amount).toEqual(1000);
    });

    it('RequiredLevel should valid', () => {
        const fxAttribute = new XrmAttribute(eventContext);
        fxAttribute.setRequiredLevel('new_name', 'required');

        expect('required').toEqual(fxAttribute.getRequiredLevel('new_name'));
    });
});