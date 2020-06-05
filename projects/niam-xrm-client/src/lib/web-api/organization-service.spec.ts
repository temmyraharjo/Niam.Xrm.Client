import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { XrmMockGenerator } from 'xrm-mock';
import { OrganizationService } from './organization-service';
import { ENTITY_METADATA, TestEntity } from './test-definitions.spec';

describe('web-api/organization-service', () => {
  let service: OrganizationService;

  beforeEach(() => {
    XrmMockGenerator.initialise();
  });

  describe('call service.retrieve', () => {
    it('return data', async () => {
      const data = {
        'id': 'ID',
        'name': 'NAME-001',
        'age': 10,
        'date': '2020-06-03T09:37:55Z',
        'bool': true,
        '_lookupid_value': '3ec01be6-7da5-ea11-a812-000d3a852080',
        '_lookupid_value@OData.Community.Display.V1.FormattedValue': 'Lookup',
        '_lookupid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'contact-entity',
        'options': 0,
        'options@OData.Community.Display.V1.FormattedValue': 'OPTIONSET'
      };
      sinon.stub(Xrm.WebApi, 'retrieveRecord').resolves(data);

      service = new OrganizationService(Xrm.WebApi);
      service.init([ENTITY_METADATA]);

      const result = await service.retrieve<TestEntity>('testentity', 'ID');

      expect(result.id).to.equal('ID');
      expect(result.name).to.equal('NAME-001');
      expect(result.bool).to.true;
      expect(result.lookupid[0].id).to.equal('3ec01be6-7da5-ea11-a812-000d3a852080');
      expect(result.lookupid[0].entityType).to.equal('contact-entity');
      expect(result.lookupid[0].name).to.equal('Lookup');
      expect(result.options).to.equal(0);
      expect(result.age).to.equal(10);
      expect(result.date.getTime()).to.equal(new Date('2020-06-03T09:37:55Z').getTime());
    });
  });
});