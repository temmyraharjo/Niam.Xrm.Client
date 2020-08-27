import { expand } from './expand';
import { expect } from 'chai';
import { Entity } from '../definitions';

describe('expand', () => {
  it('can expand one to one relationship', () => {
    const entities: Entity[] = [
      {
        id: '00000000-0000-0000-0000-000000000001',
        logicalName: 'account',
        '@odata.context':
          '[Organization URI]/api/data/v9.0/$metadata#accounts(name,primarycontactid,primarycontactid(contactid,fullname))/$entity',
        '@odata.etag': 'W/"550616"',
        name: 'Adventure Works (sample)',
        accountid: '00000000-0000-0000-0000-000000000001',
        primarycontactid: {
          '@odata.etag': 'W/"550626"',
          contactid: 'c59648c3-68f7-e511-80d3-00155db53318',
          fullname: 'Nancy Anderson (sample)',
        },
        othercontactid: {
          '@odata.etag': 'W/"550626"',
          contactid: 'c59648c3-68f7-e511-80d3-00155db53318',
          fullname: 'Nancy Anderson (sample)',
        },
        ismoney: true,
        money: 1000,
      },
    ];

    const result = expand(entities, {
      expand: 'primarycontactid($select=contactid,fullname)',
    });

    expect(result.length).to.equal(1);
    const entity = result[0];
    const attributes = Object.keys(entity);
    expect(attributes.indexOf('primarycontactid') > -1).to.true;
    expect(attributes.indexOf('othercontactid') > -1).to.not.true;
  });

  it('can expand one to many relationship', () => {
    const entities: Entity[] = [
      {
        id: 'id',
        logicalName: 'account',
        '@odata.context':
          '[Organization URI]/api/data/v9.0/$metadata#accounts(accountid,parentaccountid,Account_Tasks,parentaccountid(createdon,name),Account_Tasks(subject,scheduledstart))/$entity',
        '@odata.etag': 'W/"514069"',
        accountid: '915e89f5-29fc-e511-80d2-00155db07c77',
        parentaccountid: {
          '@odata.etag': 'W/"514074"',
          createdon: '2016-04-06T00:29:04Z',
          name: 'Adventure Works (sample)',
          accountid: '3adbf27c-8efb-e511-80d2-00155db07c77',
        },
        Account_Tasks: [
          {
            '@odata.etag': 'W/"514085"',
            subject: 'Sample Task 1',
            scheduledstart: '2016-04-11T15:00:00Z',
            activityid: 'a983a612-3ffc-e511-80d2-00155db07c77',
          },
          {
            '@odata.etag': 'W/"514082"',
            subject: 'Sample Task 2',
            scheduledstart: '2016-04-13T15:00:00Z',
            activityid: '7bcc572f-3ffc-e511-80d2-00155db07c77',
          },
        ],
      },
    ];

    const result = expand(entities, {
      expand: 'parentaccountid($select=createdon,name),Account_Tasks($select=subject,scheduledstart)',
    });
    expect(result.length).to.equal(1);
    const attributes = Object.keys(result[0]);
    expect(attributes.indexOf('parentaccountid') > -1).to.true;
    expect(attributes.indexOf('Account_Tasks') > -1).to.true;
  });
});
