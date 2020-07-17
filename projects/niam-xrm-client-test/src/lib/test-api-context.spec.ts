import { expect, assert } from 'chai';
import 'mocha';
import { TestApiContext } from './test-api-context';
import { v4 as guid } from 'uuid';
import { Entity } from './definitions/entity';

describe('test-api-context', () => {
  let context: TestApiContext;

  describe('in-memory-web-api/createRecord', () => {
    beforeEach(() => {
      context = new TestApiContext();
    });

    it('can createRecord', async () => {
      const entity = {
        name: 'person-name',
        birtdate: new Date().toISOString(),
        active: true,
      };

      const result = await context.webApi.createRecord('entity', entity);
      expect(context.createdEntities.length).to.equal(1);
      const created = context.createdEntities[0];
      expect(created.id).to.equal(result.id);
      expect(created.logicalName).to.equal(result.entityType);
    });
  });

  describe('in-memory-web-api/updateRecord', () => {
    beforeEach(() => {
      context = new TestApiContext();
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

      context.init([entity]);

      const update = {
        name: 'update-name',
        active: false,
      };

      await context.webApi.updateRecord('entity', id, update);

      const result = context.updatedEntities[0];
      expect(result.name).to.equal('update-name');
      expect(result.active).to.false;
      expect(result.fullname).to.equal('not-changed');
    });

    it('updateRecord failed', async () => {
      const update = {
        name: 'update-name',
        active: false,
      };

      context.webApi.updateRecord('entity', guid(), update).then(
        (_) => {},
        (error) => {
          expect(error).to.not.null;
        }
      );
    });
  });

  describe('in-memory-web-api/deleteRecord', () => {
    beforeEach(() => {
      context = new TestApiContext();
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

      context.init([entity]);
      await context.webApi.deleteRecord('entity', id);
      expect(context.webApi.get('entity', id)).to.null;
    });

    it('deleteRecord failed', async () => {
      context.webApi.deleteRecord('entity', guid()).then(
        (_) => {},
        (error) => {
          expect(error).to.not.null;
        }
      );
    });
  });

  describe('in-memory-web-api/retrieveMultipleRecords', () => {
    const entityId = guid();
    const record: Entity = {
      id: entityId,
      logicalName: 'account',
      '@odata.etag': 'W/"2819170"',
      'paymenttermscode@OData.Community.Display.V1.FormattedValue': 'Net 60',
      paymenttermscode: 4,
      'industrycode@OData.Community.Display.V1.FormattedValue':
        'Consumer Services',
      industrycode: 8,
      'address2_addresstypecode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      address2_addresstypecode: 1,
      'merged@OData.Community.Display.V1.FormattedValue': 'No',
      merged: false,
      accountnumber: 'AF3HN2S4',
      'statecode@OData.Community.Display.V1.FormattedValue': 'Active',
      statecode: 0,
      emailaddress1: 'vlauriant@adatum.com',
      'exchangerate@OData.Community.Display.V1.FormattedValue': '1.0000000000',
      exchangerate: 1,
      'openrevenue_state@OData.Community.Display.V1.FormattedValue': '1',
      openrevenue_state: 1,
      tickersymbol: 'ADATU',
      name: 'A. Datum',
      websiteurl: 'http://www.adatum.com',
      'opendeals@OData.Community.Display.V1.FormattedValue': '3',
      opendeals: 3,
      'modifiedon@OData.Community.Display.V1.FormattedValue':
        '12/07/2020 9:05 PTG',
      modifiedon: '2020-07-12T21:05:27Z',
      '_owninguser_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'systemuser',
      _owninguser_value: 'a1dfc355-d47c-455e-8ceb-9dc980f62d6d',
      '_primarycontactid_value@OData.Community.Display.V1.FormattedValue':
        'Vincent Lauriant',
      '_primarycontactid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
        'primarycontactid',
      '_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'contact',
      _primarycontactid_value: '465b158c-541c-e511-80d3-3863bb347ba8',
      address1_composite:
        'Magui Lan\r\nGuangzhou, Guangdong 650031\r\nRepublic of China',
      'donotpostalmail@OData.Community.Display.V1.FormattedValue': 'Allow',
      donotpostalmail: false,
      'accountratingcode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      accountratingcode: 1,
      'numberofemployees@OData.Community.Display.V1.FormattedValue': '12,000',
      numberofemployees: 12000,
      'marketingonly@OData.Community.Display.V1.FormattedValue': 'No',
      marketingonly: false,
      'revenue_base@OData.Community.Display.V1.FormattedValue':
        'RM1,000,000,000.00',
      revenue_base: 1000000000,
      'preferredcontactmethodcode@OData.Community.Display.V1.FormattedValue':
        'Any',
      preferredcontactmethodcode: 1,
      '_ownerid_value@OData.Community.Display.V1.FormattedValue':
        'Jamie Reding (Sample Data)',
      '_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
        'ownerid',
      '_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'systemuser',
      _ownerid_value: 'a1dfc355-d47c-455e-8ceb-9dc980f62d6d',
      description:
        '非常自豪能够帮助人们享受生活的产品而闻名的品牌 \n\nA. Datum provides you with a wide selection of products both in our stores and online . You’ll find huge selections of consumer electronics, desktops, notebooks, netbooks, and all the accessories to go with them. We have a HUGE selection of HDTVs, DVD and Blu-Ray players, DVRs, Home Theater Systems, GPS Players, Digital Cameras, Hi-Def Camcorders, Digital Picture Frames and so much more! Plus, we have a greatly expanded selection of computer components, like computer cases, motherboards, memory and processors – all the things to upgrade your current system, or build your own. \n\nIn addition to our incredibly low prices, we offer world-class online content designed to provide you with the in-depth knowledge you need to make informed buying decisions. Our site features hundreds of professionally produced videos, close-up photographs of each item, product reviews by customers, and countless educational articles written by experts in the computer & electronics industry. You can expect fast shipping times from our warehouse – we expect that more than 90% of our orders will be shipped from our warehouse the same day you place your order. Our goal is your 100% satisfaction! \n\nWe have a dedicated call center you can reach, 24 hours a day, 7 days a week. Our representatives are some of the best in the industry – here to help you select the right products, complete a purchase or answer any customer service questions you might have.',
      'customersizecode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      customersizecode: 1,
      'openrevenue_date@OData.Community.Display.V1.FormattedValue':
        '14/07/2020 1:34 PG',
      openrevenue_date: '2020-07-14T01:34:06Z',
      'openrevenue_base@OData.Community.Display.V1.FormattedValue': 'RM0.00',
      openrevenue_base: 0,
      'businesstypecode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      businesstypecode: 1,
      'donotemail@OData.Community.Display.V1.FormattedValue': 'Allow',
      donotemail: false,
      'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      address2_shippingmethodcode: 1,
      'timezoneruleversionnumber@OData.Community.Display.V1.FormattedValue':
        '0',
      timezoneruleversionnumber: 0,
      'revenue@OData.Community.Display.V1.FormattedValue': 'RM1,000,000,000.00',
      revenue: 1000000000,
      'address2_freighttermscode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      address2_freighttermscode: 1,
      'statuscode@OData.Community.Display.V1.FormattedValue': 'Active',
      statuscode: 1,
      'createdon@OData.Community.Display.V1.FormattedValue':
        '12/07/2020 9:03 PTG',
      createdon: '2020-07-12T21:03:10Z',
      'msdyn_travelchargetype@OData.Community.Display.V1.FormattedValue':
        'None',
      msdyn_travelchargetype: 690970003,
      'opendeals_state@OData.Community.Display.V1.FormattedValue': '1',
      opendeals_state: 1,
      address1_stateorprovince: 'Guangdong',
      'openrevenue@OData.Community.Display.V1.FormattedValue': 'RM0.00',
      openrevenue: 0,
      'donotsendmm@OData.Community.Display.V1.FormattedValue': 'Send',
      donotsendmm: false,
      'donotfax@OData.Community.Display.V1.FormattedValue': 'Allow',
      donotfax: false,
      'donotbulkpostalmail@OData.Community.Display.V1.FormattedValue': 'No',
      donotbulkpostalmail: false,
      address1_country: 'Republic of China',
      'versionnumber@OData.Community.Display.V1.FormattedValue': '2,819,170',
      versionnumber: 2819170,
      address1_line1: 'Magui Lan',
      'creditonhold@OData.Community.Display.V1.FormattedValue': 'No',
      creditonhold: false,
      telephone1: '+86-23-4444-0100',
      'donotphone@OData.Community.Display.V1.FormattedValue': 'Allow',
      donotphone: false,
      '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue':
        'Ringgit Malaysia',
      '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
        'transactioncurrencyid',
      '_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'transactioncurrency',
      _transactioncurrencyid_value: '4239ab6b-75c4-ea11-a812-000d3a852393',
      accountid: entityId,
      'donotbulkemail@OData.Community.Display.V1.FormattedValue': 'Allow',
      donotbulkemail: false,
      '_modifiedby_value@OData.Community.Display.V1.FormattedValue':
        'Jamie Reding (Sample Data)',
      '_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'systemuser',
      _modifiedby_value: 'a1dfc355-d47c-455e-8ceb-9dc980f62d6d',
      'followemail@OData.Community.Display.V1.FormattedValue': 'Allow',
      followemail: true,
      'shippingmethodcode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      shippingmethodcode: 1,
      '_createdby_value@OData.Community.Display.V1.FormattedValue':
        'Jamie Reding (Sample Data)',
      '_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname': 'systemuser',
      _createdby_value: 'a1dfc355-d47c-455e-8ceb-9dc980f62d6d',
      address1_city: 'Guangzhou',
      'territorycode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      territorycode: 1,
      'ownershipcode@OData.Community.Display.V1.FormattedValue': 'Public',
      ownershipcode: 1,
      fax: '86-23-4444-101',
      'msdyn_taxexempt@OData.Community.Display.V1.FormattedValue': 'No',
      msdyn_taxexempt: false,
      address1_addressid: '43ef81bb-754a-47ba-a8ef-d164099968bb',
      'participatesinworkflow@OData.Community.Display.V1.FormattedValue': 'No',
      participatesinworkflow: false,
      'accountclassificationcode@OData.Community.Display.V1.FormattedValue':
        'Default Value',
      accountclassificationcode: 1,
      '_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty':
        'owningbusinessunit',
      '_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname':
        'businessunit',
      _owningbusinessunit_value: '7055742c-61c4-ea11-a812-000d3a852393',
      address2_addressid: 'e6b08902-6ec0-4c79-92fb-92dcf4321c8e',
      address1_postalcode: '650031',
      'opendeals_date@OData.Community.Display.V1.FormattedValue':
        '14/07/2020 1:34 PG',
      opendeals_date: '2020-07-14T01:34:06Z',
      lastusedincampaign: null,
      address1_name: null,
      overriddencreatedon: null,
      _msdyn_preferredresource_value: null,
      entityimageid: null,
      creditlimit: null,
      entityimage_url: null,
      _territoryid_value: null,
      entityimage_timestamp: null,
      telephone3: null,
      address2_stateorprovince: null,
      aging60: null,
      address1_freighttermscode: null,
      address2_line1: null,
      _msdyn_serviceterritory_value: null,
      onholdtime: null,
      msdyn_externalaccountid: null,
      telephone2: null,
      address2_primarycontactname: null,
      address2_telephone1: null,
      address1_fax: null,
      _createdonbehalfby_value: null,
      address2_city: null,
      address2_latitude: null,
      entityimage: null,
      address1_postofficebox: null,
      address1_telephone2: null,
      aging90_base: null,
      address2_postalcode: null,
      address2_name: null,
      primarysatoriid: null,
      _msdyn_workhourtemplate_value: null,
      _owningteam_value: null,
      _masterid_value: null,
      aging30: null,
      stockexchange: null,
      address2_county: null,
      _originatingleadid_value: null,
      emailaddress3: null,
      _modifiedbyexternalparty_value: null,
      accountcategorycode: null,
      address1_shippingmethodcode: null,
      aging30_base: null,
      lastonholdtime: null,
      sic: null,
      marketcap: null,
      creditlimit_base: null,
      _preferredsystemuserid_value: null,
      _defaultpricelevelid_value: null,
      address1_primarycontactname: null,
      marketcap_base: null,
      address1_county: null,
      _preferredserviceid_value: null,
      address1_upszone: null,
      stageid: null,
      address2_composite: null,
      utcconversiontimezonecode: null,
      msdyn_travelcharge_base: null,
      customertypecode: null,
      address2_longitude: null,
      msdyn_workorderinstructions: null,
      yominame: null,
      address2_country: null,
      address1_line2: null,
      traversedpath: null,
      aging90: null,
      _msdyn_salestaxcode_value: null,
      address1_longitude: null,
      address1_telephone1: null,
      address2_line2: null,
      primarytwitterid: null,
      timespentbymeonemailandmeetings: null,
      _msdyn_billingaccount_value: null,
      _slaid_value: null,
      ftpsiteurl: null,
      _preferredequipmentid_value: null,
      teamsfollowed: null,
      processid: null,
      address2_telephone2: null,
      address1_addresstypecode: null,
      address1_utcoffset: null,
      _parentaccountid_value: null,
      _createdbyexternalparty_value: null,
      address2_fax: null,
      aging60_base: null,
      _modifiedonbehalfby_value: null,
      preferredappointmentdaycode: null,
      address1_line3: null,
      msdyn_travelcharge: null,
      address2_upszone: null,
      address2_telephone3: null,
      sharesoutstanding: null,
      _slainvokedid_value: null,
      address1_latitude: null,
      address2_line3: null,
      address2_postofficebox: null,
      address2_utcoffset: null,
      preferredappointmenttimecode: null,
      emailaddress2: null,
      msdyn_taxexemptnumber: null,
      importsequencenumber: null,
      address1_telephone3: null,
    };

    beforeEach(() => {
      context = new TestApiContext();
      context.init([record]);
    });

    it('can retrieve multiple records by accountid', async () => {
      const result = await context.webApi.retrieveMultipleRecords(
        'entity',
        '?$filter=entityid eq ' + entityId
      );

      expect(result.entities.length).to.equal(1);
      const account = result.entities[0];
      expect(account['accountid']).to.equal(entityId);
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
      context = new TestApiContext();
      context.init([record]);
    });

    it('can retrieve record', async () => {
      const result = await context.webApi.retrieveRecord('entity', entityId);

      expect(result.name).to.equal('A. Datum Corporation (sample)');
      expect(
        result[
          'address2_shippingmethodcode@OData.Community.Display.V1.FormattedValue'
        ]
      ).to.equal('Default Value');
      expect(result.address2_shippingmethodcode).to.equal(1);
    });

    it('can retrieve record with select statement', async () => {
      const result = await context.webApi.retrieveRecord(
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
