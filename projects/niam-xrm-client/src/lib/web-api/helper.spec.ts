import { expect } from 'chai';
import { METADATA_COLLECTION, ENTITY_METADATA } from './test-definitions.spec';
import { getEntityMetadata, getAttributeMetadata } from './helper';

describe('web-api/helper', () => {
  describe('getEntityMetadata', () => {
    it('can get entityMetadata', () => {
      const result = getEntityMetadata(METADATA_COLLECTION, 'testentity');
      expect(result).to.not.null;
    });

    it('throw error if entityMetadata not found', () => {
      expect(() => getEntityMetadata(METADATA_COLLECTION, 'undefined-entity')
      ).to.throw("No entity metadata found for 'undefined-entity'");
    });
  });

  describe('can get attributeMetadata', () => {
    it('can get attribute metadata', () => {
        const result = getAttributeMetadata(ENTITY_METADATA, 'id');
        expect(result).to.not.null;
    });

    it('throw error if attributeMetadata not found', () => {
        expect(() => getAttributeMetadata(ENTITY_METADATA, 'undefined-attribute')
        ).to.throw("No attribute metadata found for 'undefined-attribute' in 'testentity'");
    });

    it('return null if attributeMetadata not found', () => {
      const result = getAttributeMetadata(ENTITY_METADATA, 'undefined-attribute', false);
      expect(result).to.null;
  });
  });
});
