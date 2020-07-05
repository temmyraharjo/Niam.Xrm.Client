import { expect } from 'chai';
import 'mocha';
import { getWebApiOption } from './get-web-api-option';

describe('get-web-api-option', () => {
  describe('return default value', () => {
    it('send empty string option', () => {
      const result = getWebApiOption();
      expect(result.select).to.be.undefined;
      expect(result.top).to.be.undefined;
      expect(result.filter).to.be.undefined;
      expect(result.orderby).to.be.undefined;
      expect(result.expand).to.be.undefined;
    });
  });

  describe('validate first character', () => {
    it('throw error if not sending ? char', () => {
      expect(() => getWebApiOption('$select=firstname')).to.throw(
        "'?' not found in the first parameter"
      );
    });
  });

  describe('convert to WebApiOption', () => {
    it('can identify select', () => {
      const result = getWebApiOption('?$select=firstname');
      expect(result.select).to.equal('firstname');
      expect(result.filter).to.undefined;
      expect(result.expand).to.undefined;
      expect(result.top).to.undefined;
      expect(result.orderby).to.undefined;
    });

    it('can identify filter', () => {
      const result = getWebApiOption('?$filter=firstname eq Temmy');
      expect(result.filter).to.equal('firstname eq Temmy');
      expect(result.select).to.undefined;
      expect(result.expand).to.undefined;
      expect(result.top).to.undefined;
      expect(result.orderby).to.undefined;
    });

    it('can identify expand', () => {
      const result = getWebApiOption(
        '?$expand=new_superiorid($select=firstname)'
      );
      expect(result.expand).to.equal('new_superiorid($select=firstname)');
      expect(result.select).to.undefined;
      expect(result.filter).to.undefined;
      expect(result.top).to.undefined;
      expect(result.orderby).to.undefined;
    });

    it('can identify top', () => {
      const result = getWebApiOption('?$top=10');
      expect(result.top).to.equal('10');
      expect(result.expand).to.undefined;
      expect(result.select).to.undefined;
      expect(result.filter).to.undefined;
      expect(result.orderby).to.undefined;
    });

    it('can identify orderby', () => {
      const result = getWebApiOption('?$orderby=firstname asc');
      expect(result.orderby).to.equal('firstname asc');
      expect(result.top).to.undefined;
      expect(result.expand).to.undefined;
      expect(result.select).to.undefined;
      expect(result.filter).to.undefined;
    });

    it('can identity multiple option', () => {
      const result = getWebApiOption(
        '?$select=firstname&$filter=firstname eq Temmy&$top=10&$expand=new_superiorid($select=firstname)&$orderby=firstname asc'
      );
      expect(result.select).to.equal('firstname');
      expect(result.expand).to.equal('new_superiorid($select=firstname)');
      expect(result.orderby).to.equal('firstname asc');
      expect(result.top).to.equal('10');
      expect(result.filter).to.equal('firstname eq Temmy');
    });
  });
});
