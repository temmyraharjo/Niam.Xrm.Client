# Introduction

**Niam.Xrm.Client** is a wrapping framework for Xrm object. The goal of this project is too simplified customization in Dynamics CRM (Model-Driven Apps) Front End Development.

**Niam.Xrm.Client.Test** is a testing object of Xrm.WebApi. You can combine these both projects to enable Test-Driven Development on your project.

## Installing

For latest stable version Niam.Xrm.Client:

` npm install @insurgo/niam.xrm.client `

For latest stable version Niam.Xrm.Client.Test:

` npm install @insurgo/niam.xrm.client.test `

## Usage

There are two ways of using Niam.Xrm.Client:

- Late Bound
- Early Bound

### Early Bound

We can create metadata of the entity. For example:

    export type entity  = {
        new_name: string;
        new_documentdate: Date;
    };

Then we can import import `Fx` in your code and use it like this:

    import { entity } from './entities';
    import { Fx } from '@insurgo/niam.xrm.client';

    export function formLoaded(context: Xrm.Events.EventContext) {
        initFormCreate(context);
    }

    export function initFormCreate(context: Xrm.Events.EventContext) {
        const fx = new Fx<entity>(context);
        if(fx.formContext.ui.getFormType() !== XrmEnum.FormType.Create) return;

        fx.set('new_name', 'Form TypeScript UI');
        fx.set('new_documentdate', new Date());
    }

### Late Bound

We can import `Fx` in your code and use it like this:

    import { Fx } from '@insurgo/niam.xrm.client';

    export function formLoaded(context: Xrm.Events.EventContext) {
        initFormCreate(context);
    }

    export function initFormCreate(context: Xrm.Events.EventContext) {
        const fx = new Fx(context);
        if(fx.formContext.ui.getFormType() !== XrmEnum.FormType.Create) return;

        fx.set('new_name', 'Form TypeScript UI');
        fx.set('new_documentdate', new Date());
    }

### Niam.Xrm.Client.Test

What you need to do to use this:

1. import TestApiContext from @insurgo/niam.xrm.client.test.

1. Instance new TestApiContext.

1. Mock Xrm.WebApi object with TestApiContext.webApi.

Sample of the code for testing:

    import { expect } from 'chai';
    import { XrmMockGenerator } from 'xrm-mock';
    import { setSubmittedBy } from './form';
    import { TestApiContext } from '@insurgo/niam.xrm.client.test';
    import * as sinon from 'sinon';

    describe('new_customdocument form tests', () => {
        beforeEach(() => {
            XrmMockGenerator.initialise();
            XrmMockGenerator.Attribute.createString('new_name');
            XrmMockGenerator.Attribute.createDate('new_documentdate');
            XrmMockGenerator.Attribute.createLookup('new_submittedby', []);
        });

        describe('on form create', () => {
            let testContext: TestApiContext;
            beforeEach(() => {
                sinon.stub(XrmMockGenerator.getFormContext().ui, 'getFormType').
                    returns(XrmEnum.FormType.Create);

                testContext = new TestApiContext();
                sinon.replace(Xrm, 'WebApi', testContext.webApi);
            });

            it('initFormCreate set submittedby', async () => {
                const contact = {
                    id: 'account-id',
                    logicalName: 'account',
                    name: 'A Datum Corporation',
                    accountid: 'account-id'
                };

                testContext.init([contact]);
                await setSubmittedBy(XrmMockGenerator.getEventContext());

                const formContext = XrmMockGenerator.getFormContext();
                const submittedByRef = formContext.getAttribute('new_submittedby').getValue();
                expect(submittedByRef[0].id).to.equal('account-id');
            });
        });
    });

Sample of implementation code:

    import { entity } from './entities';
    import { Fx } from '@insurgo/niam.xrm.client';

    export async function setSubmittedBy(context: Xrm.Events.EventContext) {
        const fx = new Fx<entity>(context);

        const data = await Xrm.WebApi.retrieveMultipleRecords('account', "?$filter=name eq 'A Datum Corporation'");
        const valid = data && data.entities && data.entities.length > 0;
        if (!valid) return;
        
        var accountRef: Xrm.LookupValue[] = [
            {
                entityType: 'account',
                id: data.entities[0].accountid,
                name: data.entities[0].name
            }
        ];
        fx.set('new_submittedby', accountRef);
    }
