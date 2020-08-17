import { expect } from 'chai';
import 'mocha';
import { top } from './top';
import { Entity } from '../definitions/entity';

describe('top', () => {
  describe('get top entities', () => {
    it('can return original entities if length > original', () => {
      const entities: Entity[] = [
        { id: '1', logicalName: 'test' },
        { id: '2', logicalName: 'test' },
        { id: '3', logicalName: 'test' },
      ];

      const result = top(entities, { top: '5' });
      expect(result.length).to.equal(3);
    });

    it('can get top 1 only', () => {
        const entities: Entity[] = [
          { id: '1', logicalName: 'test' },
          { id: '2', logicalName: 'test' },
          { id: '3', logicalName: 'test' },
        ];
  
        const result = top(entities, { top: '1' });
        expect(result.length).to.equal(1);
      });
  });
});
