import { XrmTest } from '../../src/lib/xrm-test';

describe('XrmTest', () => {
  let test: XrmTest;
  beforeEach(() => {
    test = new XrmTest();
  });

  it('XrmTest creation', () => {
    expect(test.xrmMock).toBeTruthy();
    expect(test.eventContext).toBeTruthy();
  });

  it('XrmTest create attributes', () => {
    test.createAttribute('new_name', '');
    const nameAttribute = test.getAttribute('new_name');
    expect(nameAttribute).toBeTruthy();

    test.createAttribute('new_amount', 0);
    const amountAttribute = test.getAttribute('new_amount');
    expect(amountAttribute).toBeTruthy();

    const lookup: Xrm.LookupValue = {
      entityType: 'account',
      id: test.newGuid(),
      name: 'Account'
    };
    test.createAttribute('new_accountid', lookup);
    const accountRef = test.getAttribute('new_accountid');
    expect(accountRef).toBeTruthy();

    const optionSet: Xrm.OptionSetValue = {
        text: 'Active',
        value: 0
    };
    test.createAttribute('statecode', optionSet);
    const stateCode = test.getAttribute('statecode');
    expect(stateCode).toBeTruthy();

    test.createAttribute('new_date', new Date());
    const date = test.getAttribute('new_date');
    expect(date).toBeTruthy();
  });
});
