import { FxAttribute } from '../../src/core/FxAttribute';
import { ACCOUNT_METADATA, IFormAccount } from '../../src/entities';
import { IFxAttribute } from '../../src/interfaces/IFxAttribute';
import { IFxTest } from '../../src/test-lib/interfaces/IFxTest';
import { FxTest } from '../../src/test-lib/FxTest';
import { expect } from 'chai';
import { Guid } from '../../src/util';

describe('testing FxAttribute', () => {
    let fxAttribute: IFxAttribute<IFormAccount>;
    let fxTest: IFxTest<IFormAccount>;

    function initTest() {
        fxTest = new FxTest(ACCOUNT_METADATA);
        fxAttribute = new FxAttribute<IFormAccount>(fxTest.fxContext);
    }

    it('can create', () => {
        initTest();
        expect(fxAttribute).to.be.not.null;
    });

    it('test get value', () => {
        initTest();

        const formAccount = <IFormAccount>{};
        formAccount.name = 'ACCOUNT 001';
        formAccount.accountnumber = 'ACCOUNT-001';
        const transactionId = Guid.newGuid();
        formAccount.transactioncurrencyid = [{
            entityType: 'transactioncurrency',
            id: transactionId,
            name: 'IDR'
        }];
        formAccount.aging30 = 10;
        formAccount.creditlimit = 20;

        const date = new Date();
        formAccount.createdon = date;

        fxTest.init(formAccount);

        const name = fxAttribute.getValue('name');
        expect(name).to.be.equal('ACCOUNT 001');

        const accountNumber = fxAttribute.getValue('accountnumber');
        expect(accountNumber).to.be.equal('ACCOUNT-001');

        const transactioncurrencyRef = 
            fxAttribute.getValue('transactioncurrencyid')[0];
        expect(transactionId).to.be.equal(transactioncurrencyRef.id);
        expect('transactioncurrency').to.be.equal(transactioncurrencyRef.entityType);
        expect('IDR').to.be.equal(transactioncurrencyRef.name);

        const aging = fxAttribute.getValue('aging30');
        expect(aging).to.be.equal(10);

        const creditLimit = fxAttribute.getValue('creditlimit');
        expect(creditLimit).to.be.equal(20);

        const createdOn = fxAttribute.getValue('createdon');
        expect(createdOn).to.be.equal(date);
    });

    it('test set value', () => {
        initTest();

        const formAccount = <IFormAccount>{};
        fxTest.init(formAccount);

        const date = new Date();
        fxAttribute.setValue('createdon', date);
        expect(fxAttribute.getValue('createdon')).to.be.equal(date);

        const transactionId = Guid.newGuid();
        fxAttribute.setValue('transactioncurrencyid', [{
            entityType: 'transactioncurrency',
            id: transactionId,
            name: 'IDR'
        }]);
        const transactioncurrencyRef = fxAttribute.
            getValue('transactioncurrencyid')[0];
        expect(transactioncurrencyRef.id).to.equal(transactionId);
        expect(transactioncurrencyRef.name).to.equal('IDR');
        expect(transactioncurrencyRef.entityType).to.equal('transactioncurrency');

        fxAttribute.setValue('name', 'ACCOUNT 002');
        expect(fxAttribute.getValue('name')).to.equal('ACCOUNT 002');
    });

    it('test get/set requirementlevel', () => {
        initTest();

        const formAccount = <IFormAccount>{};
        fxTest.init(formAccount);

        fxAttribute.setRequiredLevel('name', 'required');
        expect(fxAttribute.getRequiredLevel('name')).to.equal('required');
    });
})