// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('testValue')).resolves.toBe('testValue');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('errorMsg');
    } catch (e) {
      expect((e as Error).message).toBe('errorMsg');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (e) {
      expect((e as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (e) {
      expect((e as MyAwesomeError).message).toBe(
        'This is my awesome custom error!',
      );
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
