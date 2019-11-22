import { XrmMockGenerator } from 'xrm-mock';
import { XrmControl } from '../../src/lib/xrm-control';

describe('XrmControl tests', () => {
    let eventContext: Xrm.Events.EventContext;
    
    beforeEach(() => {
        XrmMockGenerator.initialise();
        XrmMockGenerator.Attribute.createString({
            name: 'new_name'
        }, {
            visible: false
        });
        XrmMockGenerator.Attribute.createNumber({
            name: 'new_amount'
        }, {
            visible: false
        });

        eventContext = XrmMockGenerator.getEventContext();
    });

    it('setVisible and getVisible', () => {
        const fxControl = new XrmControl(eventContext);
        expect(fxControl.getVisible('new_name')).toBeFalsy();
        fxControl.setVisible('new_name', true);
        expect(fxControl.getVisible('new_name')).toBeTruthy();
    });
});