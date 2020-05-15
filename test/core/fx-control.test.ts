import { IFxTest } from '../../src/test-lib/interfaces/IFxTest';
import { FxTest } from '../../src/test-lib/FxTest';
import { IFxControl } from '../../src/interfaces/IFxControl';
import { FxControl } from '../../src/core/FxControl';
import { IFormAccount, ACCOUNT_METADATA } from '../../src//entities';
import { expect } from 'chai';

describe('testing FxControl', () => {
    let fxControl: FxControl<IFormAccount>;
    let fxTest: IFxTest<IFormAccount>;

    function initTest() {
        fxTest = new FxTest(ACCOUNT_METADATA);
        fxControl = new FxControl<IFormAccount>(fxTest.fxContext, 
            ACCOUNT_METADATA);

        const formAccount = <IFormAccount>{};
        fxTest.init(formAccount);
    }

    it('can create FxControl', () => {
        initTest();
        expect(fxControl).to.be.not.null;
    });

    it('can get control', () => {
        initTest();
        const nameControl = fxControl.getControl('transactioncurrencyid');
        expect(nameControl).to.be.not.null;
    })
});