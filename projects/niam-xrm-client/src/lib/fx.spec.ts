import { expect } from 'chai';
import 'mocha';
import { Fx, FxGlobal, initFxOptions } from './fx';
import { XrmMockGenerator } from 'xrm-mock';
import { EntityMetadata } from './definitions';

// https://github.com/microsoft/TypeScript/issues/32263
export type TestEntity = {
  name?: string;
  age?: number;
  date?: Date;
  bool?: boolean;
  lookupid?: Xrm.LookupValue[];
  options?: number;
}

export type TestEntityForm = {
  grid?: Xrm.Controls.GridControl;
}

describe('Fx', () => {
  let context: Xrm.Events.EventContext;
  let fx: Fx<TestEntity, TestEntityForm>;

  beforeEach(() => {
    XrmMockGenerator.initialise();
    const attr = XrmMockGenerator.Attribute;
    attr.createString('name', 'NAME-001');
    attr.createNumber('age', 15);
    attr.createDate('date', new Date(2020, 1, 2));
    attr.createBoolean('bool', true);
    attr.createLookup('lookupid', [{ id: 'my-id', name: 'LookupName', entityType: '1234' }]);
    attr.createOptionSet('options', 2);

    const ctrl = XrmMockGenerator.Control;
    ctrl.createGrid('grid');

    context = XrmMockGenerator.getEventContext();
    fx = new Fx<TestEntity, TestEntityForm>(context);
  });

  it('can create Fx object', () => {
    expect(fx.context).equal(context);
  });

  describe('early-bound', () => {
    it('can get attribute value', () => {
      const age: number = fx.get('age');
      const name: string = fx.get('name');
      const date: Date = fx.get('date');
      const bool: boolean = fx.get('bool');
      const lookupid: Xrm.LookupValue[] = fx.get('lookupid');
      const options: number = fx.get('options');

      expect(age).to.equal(15);
      expect(name).to.equal('NAME-001');
      expect(date).to.deep.equal(new Date(2020, 1, 2));
      expect(bool).to.equal(true);
      expect(lookupid).to.deep.equal([{ id: 'my-id', name: 'LookupName', entityType: '1234' }]);
      expect(options).to.equal(2);
    });

    it('can set attribute value', () => {
      fx.set('age', 10);
      const age: number = fx.get('age');
      expect(age).to.equal(10);

      fx.set('name', 'NAME-002');
      const name: string = fx.get('name');
      expect(name).to.equal('NAME-002');
    });

    it('can get attribute', () => {
      const nameAttribute: Xrm.Attributes.StringAttribute = fx.attr('name');
      const ageAttribute: Xrm.Attributes.NumberAttribute = fx.attr('age');
      const boolAttribute: Xrm.Attributes.BooleanAttribute = fx.attr('bool');
      const optionsAttribute: Xrm.Attributes.OptionSetAttribute = fx.attr<Xrm.Attributes.OptionSetAttribute>('options');
      const dateAttribute: Xrm.Attributes.DateAttribute = fx.attr('date');

      expect(nameAttribute).is.not.null;
      expect(ageAttribute).is.not.null;
      expect(boolAttribute).is.not.null;
      expect(optionsAttribute).is.not.null;
      expect(dateAttribute).is.not.null;
    });

    it('can get attribute control', () => {
      const nameControl: Xrm.Controls.StringControl = fx.ctrl('name');
      const ageControl: Xrm.Controls.NumberControl = fx.ctrl('age');
      const boolControl: Xrm.Controls.StandardControl = fx.ctrl('bool');
      const optionsControl: Xrm.Controls.OptionSetControl = fx.ctrl<Xrm.Controls.OptionSetControl>('options');
      const dateControl: Xrm.Controls.DateControl = fx.ctrl('date');

      expect(nameControl).is.not.null;
      expect(ageControl).is.not.null;
      expect(boolControl).is.not.null;
      expect(optionsControl).is.not.null;
      expect(dateControl).is.not.null;
    });

    it('can get form control', () => {
      const gridControl: Xrm.Controls.GridControl = fx.ctrl('grid');
      expect(gridControl).is.not.null;
    });
  });

  describe('late-bound', () => {
    let fx: Fx;

    beforeEach(() => {
      fx = new Fx(context);
    });

    it('can get attribute value', () => {
      expect(fx.get<string>('name')).to.equal('NAME-001');
      expect(fx.get<number>('age')).to.equal(15);
    });

    it('can set attribute value', () => {
      fx.set('name', 'NAME-003');
      expect(fx.get<string>('name')).to.equal('NAME-003');

      fx.set('age', 99);
      expect(fx.get<number>('age')).to.equal(99);
    });

    it('can get control', () => {
      expect(fx.ctrl<Xrm.Controls.NumberControl>('name')).is.not.null;
      expect(fx.ctrl<Xrm.Controls.LookupControl>('lookupid')).is.not.null;
      expect(fx.ctrl<Xrm.Controls.NumberControl>('age')).is.not.null;
      expect(fx.ctrl<Xrm.Controls.StandardControl>('bool')).is.not.null;
      expect(fx.ctrl<Xrm.Controls.OptionSetControl>('options')).is.not.null;
      expect(fx.ctrl<Xrm.Controls.GridControl>('grid')).is.not.null;
    });
  });
});

describe('FxOptions', () => {
  let global: FxGlobal = {
    metadata: [
      {
        schemaName: 'globalentity',
        logicalName: 'globalentity',
        entitySetName: 'globalentities',
        attributes: []
      }
    ]
  };

  it('can init from empty options', () => {
    const options = initFxOptions(null, global);
    expect(options.metadata).to.equal(global.metadata);
  });

  [
    { name: 'null', metadata: null },
    { name: 'undefined', metadata: undefined },
    { name: 'empty', metadata: [] }
  ].forEach(test => {
    it(`use global.metadata when options.metadata is ${test.name}`, () => {
      const options = initFxOptions({ metadata: test.metadata }, global);
      expect(options.metadata).to.equal(global.metadata);
    });
  });

  it('use custom metadata', () => {
    const metadata: EntityMetadata[] = [
      {
        schemaName: 'customentity',
        logicalName: 'customentity',
        entitySetName: 'customentities',
        attributes: []
      }
    ];

    const options = initFxOptions({ metadata }, global);
    expect(options.metadata).to.equal(metadata);
  });
});
