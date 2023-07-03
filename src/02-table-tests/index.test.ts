// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 7, b: 4, action: Action.Multiply, expected: 28 },
  { a: 5, b: 1, action: Action.Multiply, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 28, b: 4, action: Action.Divide, expected: 7 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
  { a: 9, b: 2, action: '//', expected: null },
  { a: 4, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach((data) => {
    test(`should ${data.a} ${data.action} ${data.b} and get result: ${data.expected}`, () => {
      const result = simpleCalculator(data);
      expect(result).toBe(data.expected);
    });
  });
});
