import { expect } from 'chai';
import 'mocha';
import { executeOnce } from './execute-once';

describe('utils/execute-once', () => {
  it('can execute once with no argument', () => {
    let num = 0;
    const fn = executeOnce(() => {
      num++;
    });

    fn();
    fn();
    fn();
    expect(num).to.equal(1);
  });

  it('can execute once with one argument', () => {
    let num1 = 0;
    let num2 = 2;
    const fn = executeOnce((increment: number) => {
      num1 += increment;
      num2 += increment;
    });

    fn(5);
    fn(6);
    fn(7);
    expect(num1).to.equal(5);
    expect(num2).to.equal(7);
  });

  it('can execute once with two arguments', () => {
    let num1 = 0;
    let num2 = 2;
    const fn = executeOnce((for1: number, for2: number) => {
      num1 += for1;
      num2 += for2;
    });

    fn(5, 7);
    fn(6, 8);
    fn(7, 9);
    expect(num1).to.equal(5);
    expect(num2).to.equal(9);
  });

  it('can execute once with three arguments', () => {
    let num1 = 0;
    let num2 = 2;
    let num3 = 5;
    const fn = executeOnce((for1: number, for2: number, for3: number) => {
      num1 += for1;
      num2 += for2;
      num3 += for3;
    });

    fn(1, 2, 3);
    fn(4, 5, 6);
    fn(7, 8, 9);
    expect(num1).to.equal(1);
    expect(num2).to.equal(4);
    expect(num3).to.equal(8);
  });
});