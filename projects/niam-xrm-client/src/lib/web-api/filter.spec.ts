describe('retrieve-multiple', () => {

    describe('retrieveMultipleRecords', () => {
        beforeEach(() => {
          const data = {
            id: 'ID',
            name: 'NAME-001',
            age: 10,
            date: '2020-06-03T09:37:55Z',
            bool: true,
            _lookupid_value: '3ec01be6-7da5-ea11-a812-000d3a852080',
            '_lookupid_value@OData.Community.Display.V1.FormattedValue': 'Lookup',
            '_lookupid_value@Microsoft.Dynamics.CRM.lookuplogicalname':
              'contact-entity',
            options: 0,
            'options@OData.Community.Display.V1.FormattedValue': 'OPTIONSET',
          };
          sinon.stub(Xrm.WebApi, 'retrieveMultipleRecords').
            resolves({ entities: [data], nextLink: null });
        });
      });
});