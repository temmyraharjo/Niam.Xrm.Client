import { order } from './order';
import { expect } from 'chai';
import { Entity } from '../definitions/entity';

describe('order', () => {
  describe('order the entities', () => {
    it('can order string attribute correctly', () => {
      const entities: Entity[] = [
        { id: '1', logicalName: 'test', name: 'c' },
        { id: '2', logicalName: 'test', name: 'a' },
        { id: '3', logicalName: 'test', name: 'b' },
      ];

      let result = order(entities, {
          orderby:'name asc'
      });

      expect(result[0].id).to.equal('2');
      expect(result[1].id).to.equal('3');
      expect(result[2].id).to.equal('1');

      result = order(entities, {
          orderby:'name desc'
      });

      expect(result[0].id).to.equal('1');
      expect(result[1].id).to.equal('3');
      expect(result[2].id).to.equal('2');
    });

    it('can order date attribute correctly', () => {
        const entities: Entity[] = [
          { id: '1', logicalName: 'test', date: '2020-07-12T21:05:27Z' },
          { id: '2', logicalName: 'test', date: '2020-07-12T21:05:12Z' },
          { id: '3', logicalName: 'test', date: '2020-07-12T21:05:40Z' },
        ];
  
        let result = order(entities, {
            orderby:'date asc'
        });
  
        expect(result[0].id).to.equal('2');
        expect(result[1].id).to.equal('1');
        expect(result[2].id).to.equal('3');
  
        result = order(entities, {
            orderby:'date desc'
        });
  
        expect(result[0].id).to.equal('3');
        expect(result[1].id).to.equal('1');
        expect(result[2].id).to.equal('2');
      });
  });
});
