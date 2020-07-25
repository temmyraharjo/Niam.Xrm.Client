import { parsingValue, getCommands, operator, transformText, getHierarchyCommands } from './filter';
import { expect } from 'chai';

describe('filter tests', () => {
  describe('getting value', () => {
    it('it can parsing value', () => {
      let value = "'('123-'123')'";
      let result = parsingValue(value);
      expect(result.text).to.equal("('123-'123')");

      value = '"hello"';
      result = parsingValue(value);
      expect(result.text).to.equal('hello');
    });
  });

  describe('transform value for logicalOperator', () => {
    it('can transform text for logicalOperator', () => {
      let command = "account eq 'this is or operator'";
      expect(transformText(command)).to.equal(
        "account eq 'this is _|_|_ operator'"
      );

      command = "account eq 'this is and operator'";
      expect(transformText(command)).to.equal(
        "account eq 'this is _&_&_ operator'"
      );
    });
  });

  describe('getHierarchy', () => {
    it('can identified simple command', () => {
      let command = "accountid eq 123 and accountid eq 123";
      let result = getHierarchyCommands(command);

      expect(result.length).to.equal(2);

      command = "(a eq 123 and b eq 123)";
      result = getHierarchyCommands(command);
      expect(result.length).to.equal(1);
      expect(result[0].attributeName).to.equal('a');
      expect(result[0].filterTypes.length).to.equal(1);
      expect(result[0].filterTypes[0].attributeName).to.equal('b');

      command = "(a eq 123 and b eq 123) or c eq 341";
      result = getHierarchyCommands(command);
      expect(result.length).to.equal(2);
      expect(result[0].attributeName).to.equal('a');
      expect(result[0].filterTypes.length).to.equal(1);
      expect(result[0].filterTypes[0].attributeName).to.equal('b');
      expect(result[1].attributeName).to.equal('c');
    });
  });

  describe('getCommand', () => {
    it('can identified command', () => {
      let command = 'accountid eq 123-123';
      let result = getCommands(command);

      expect(result.length).to.equal(1);
      expect(result[0].attributeName).to.equal('accountid');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('123-123');

      command = 'not accountid eq 123-123';
      result = getCommands(command);

      expect(result.length).to.equal(1);
      expect(result[0].not).to.true;
      expect(result[0].attributeName).to.equal('accountid');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('123-123');
    });

    it('can identified specialCommand', () => {
      let command = "contains(name,'(sample)')";
      let result = getCommands(command);

      expect(result.length).to.equal(1);
      expect(result[0].attributeName).to.equal('name');
      expect(result[0].operator).to.equal(operator.contains);
      expect(result[0].value).to.equal('(sample)');

      command = "not endswith(name,'Inc.')";
      result = getCommands(command);

      expect(result.length).to.equal(1);
      expect(result[0].not).to.true;
      expect(result[0].attributeName).to.equal('name');
      expect(result[0].operator).to.equal(operator.endswith);
      expect(result[0].value).to.equal('Inc.');
    });

    it('can identified logicalOperator', () => {
      let command =
        'accountid eq 123-123 or accountid eq 234-234 or accountid ne 456-456';
      let result = getCommands(command);

      expect(result.length).to.equal(3);
      expect(result[0].attributeName).to.equal('accountid');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('123-123');
      expect(result[1].attributeName).to.equal('accountid');
      expect(result[1].operator).to.equal(operator.eq);
      expect(result[1].value).to.equal('234-234');
      expect(result[2].attributeName).to.equal('accountid');
      expect(result[2].operator).to.equal(operator.ne);
      expect(result[2].value).to.equal('456-456');

      command = "accountname eq 'this is or operator'";
      result = getCommands(command);

      expect(result.length).to.equal(1);
      expect(result[0].attributeName).to.equal('accountname');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('this is or operator');
    });

    it('can identified bracket', () => {
      let command = '(((accountid eq 123-123)))';
      let result = getCommands(command);
      expect(result.length).to.equal(1);
      expect(result[0].attributeName).to.equal('accountid');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('123-123');
      expect(result[0].bracketOpenCt).to.equal(3);
      expect(result[0].bracketCloseCt).to.equal(3);

      command = '(((accountid eq 123-123) or customerid eq 123-123))';
      result = getCommands(command);
      expect(result.length).to.equal(2);
      expect(result[0].attributeName).to.equal('accountid');
      expect(result[0].operator).to.equal(operator.eq);
      expect(result[0].value).to.equal('123-123');
      expect(result[0].bracketOpenCt).to.equal(3);
      expect(result[0].bracketCloseCt).to.equal(1);

      expect(result[1].attributeName).to.equal('customerid');
      expect(result[1].operator).to.equal(operator.eq);
      expect(result[1].value).to.equal('123-123');
      expect(result[1].bracketOpenCt).to.equal(0);
      expect(result[1].bracketCloseCt).to.equal(2);
    });
  });
});

// describe('getFilterType', () => {
//   it('can get simple statement', () => {
//     const command = "(accountid eq 123-123)";
//     const result = getFilterType(command);
//     expect(result.length).to.equal(1);
//     expect(result[0].attributeName).to.equal('accountid');
//     expect(result[0].operator).to.equal(operator.eq);
//     expect(result[0].value).to.equal('123-123');
//     expect(result[0].filterTypes).to.undefined;
//     expect(result[0].logicalOperator).to.undefined;
//   });

//   it('can split multiple statement', () => {
//     const command = "accountid eq 123-123 and contains(accountname, 'test')";
//     const result = getFilterType(command);
//     expect(result.length).to.equal(2);

//     expect(result[0].attributeName).to.equal('accountid');
//     expect(result[0].operator).to.equal(operator.eq);
//     expect(result[0].value).to.equal('123-123');
//     expect(result[0].filterTypes).to.undefined;
//     expect(result[0].logicalOperator).to.equal(logicalOperator.and);

//     expect(result[1].attributeName).to.equal('accountname');
//     expect(result[1].operator).to.equal(operator.contains);
//     expect(result[1].value).to.equal('test');
//   });

//   it('can split based on grouping statement', () => {
//     const command = "(accountid eq 123-123 or accountid eq 231-231) and contains(accountname, 'test')";
//     const result = getFilterType(command);
//     expect(result.length).to.equal(2);

//     expect(result[0].filterTypes[0]).to.equal('accountid');
//     expect(result[0].filterTypes[0].operator).to.equal(operator.eq);
//     expect(result[0].filterTypes[0].value).to.equal('123-123');
//     expect(result[0].filterTypes[0].logicalOperator).to.equal(logicalOperator.or);

//     expect(result[0].filterTypes[1]).to.equal('accountid');
//     expect(result[0].filterTypes[1].operator).to.equal(operator.eq);
//     expect(result[0].filterTypes[1].value).to.equal('231-231');
//     expect(result[0].logicalOperator).to.equal(logicalOperator.and);

//     expect(result[1].attributeName).to.equal('accountname');
//     expect(result[1].operator).to.equal(operator.contains);
//     expect(result[1].value).to.equal('test');
//   });
// });
