import { expect } from 'chai';
import 'mocha';
import { Fx } from '@niam/xrm-client';
import { XrmMockGenerator } from 'xrm-mock';
import * as entities from '../../entities';
import * as firstname from './firstname';

describe('firstname', () => {
    it('run firstname', () => {
        XrmMockGenerator.initialise();
        XrmMockGenerator.Attribute.createString('new_firstname', 'FirstName');
        XrmMockGenerator.Attribute.createString('new_lastname', 'LastName');
        XrmMockGenerator.Attribute.createString('new_fullname', '');
        
        const context = XrmMockGenerator.getEventContext();
        firstname.changed(context);

        const fullname = XrmMockGenerator.getFormContext().
            getAttribute('new_fullname').getValue();

        expect(fullname).to.equal('FirstName LastName');
    });
});