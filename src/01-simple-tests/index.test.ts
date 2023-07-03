// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 4,
      b: 4,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 4,
      b: 4,
      action: Action.Subtract,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 4,
      b: 4,
      action: Action.Multiply,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(16);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 4,
      b: 4,
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 4,
      b: 2,
      action: '//',
    };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 4,
      b: null,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });
});
