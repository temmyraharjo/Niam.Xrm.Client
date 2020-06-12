import { expect } from 'chai';
import 'mocha';
import { InMemoryWebApi } from './in-memory-web-api';
import { v4 as guid } from 'uuid';
import { Entity } from './definitions/entity';

describe('in-memory-web-api', () => {
  let webApi: InMemoryWebApi;
  describe('in-memory-web-api/createRecord', () => {
    beforeEach(() => {
      webApi = new InMemoryWebApi();
    });

    it('can createRecord', async () => {
      const entity = {
        name: 'person-name',
        birtdate: new Date().toISOString(),
        active: true,
      };

      const result = await webApi.createRecord('entity', entity);
      expect(result.entityType).to.equal('entity');
      expect(result.id).to.not.null;
    });
  });

  describe('in-memory-web-api/updateRecord', () => {
    beforeEach(() => {
      webApi = new InMemoryWebApi();
    });

    it('can updateRecord', async () => {
      const id = guid();
      const entity: Entity = {
        id: id,
        logicalName: 'entity',
        name: 'person-name',
        birtdate: new Date().toISOString(),
        fullname: 'not-changed',
        active: true,
      };

      webApi.init([entity]);

      const update = {
        name: 'update-name',
        active: false,
      };

      await webApi.updateRecord('entity', id, update);

      const result = webApi.get('entity', id);
      expect(result.name).to.equal('update-name');
      expect(result.active).to.false;
      expect(result.fullname).to.equal('not-changed');
    });

    it('updateRecord failed', async () => {
      const update = {
        name: 'update-name',
        active: false,
      };

      webApi.updateRecord('entity', guid(), update).then(
        (_) => {},
        (error) => {
          expect(error).to.not.null;
        }
      );
    });
  });

  describe('in-memory-web-api/deleteRecord', () => {
    beforeEach(() => {
      webApi = new InMemoryWebApi();
    });

    it('can delete', async () => {
      const id = guid();
      const entity: Entity = {
        id: id,
        logicalName: 'entity',
        name: 'person-name',
        birtdate: new Date().toISOString(),
        fullname: 'not-changed',
        active: true,
      };

      webApi.init([entity]);
      await webApi.deleteRecord('entity', id);
      expect(webApi.get('entity', id)).to.null;
    });

    it('deleteRecord failed', async () => {
      webApi.deleteRecord('entity', guid()).then(
        (_) => {},
        (error) => {
          expect(error).to.not.null;
        }
      );
    });
  });

  describe('in-memory-web-api/retrieveRecord', () => {
    const entityId = guid();
    const record: Entity = {
      logicalName: 'entity',
      id: entityId,
      name: 'A. Datum Corporation (sample)',
      'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      address2_shippingmethodcode: 1,
      'revenue@OData.Community.Display.V1.FormattedValue': 'RM10,000.00',
      revenue: 10000,
      'statuscode@OData.Community.Display.V1.FormattedValue': 'Active',
      statuscode: 1,
      '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue':
        'Ringgit Malaysia',
      '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
        'transactioncurrencyid',
      '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'transactioncurrency',
      _transactioncurrencyid_value: 'd0d4d62d-799d-ea11-a812-000d3a80c79e',
    };

    beforeEach(() => {
      webApi = new InMemoryWebApi();
      webApi.init([record]);
    });

    it('can retrieve record', async () => {
      const result = await webApi.retrieveRecord('entity', entityId);

      expect(result.name).to.equal('A. Datum Corporation (sample)');
      expect(
        result[
          'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue'
        ]
      ).to.equal('Default Value');
      expect(result.address2_shippingmethodcode).to.equal(1);
    });

    it('can retrieve record with select statement', async () => {
      const result = await webApi.retrieveRecord(
        'entity',
        entityId,
        '?$select=name,statuscode,_transactioncurrencyid_value'
      );

      expect(result.name).to.equal('A. Datum Corporation (sample)');
      expect(result['statuscode']).to.equal(1);
      expect(
        result['statuscode@OData.Community.Display.V1.FormattedValue']
      ).to.equal('Active');
      expect(
        result[
          '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue'
        ]
      ).to.equal('Ringgit Malaysia');
      expect(
        result[
          '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty'
        ]
      ).to.equal('transactioncurrencyid');
      expect(
        result[
          '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname'
        ]
      ).to.equal('transactioncurrency');
      expect(result['_transactioncurrencyid_value']).to.equal(
        'd0d4d62d-799d-ea11-a812-000d3a80c79e'
      );
    });
  });
});