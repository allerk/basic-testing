// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callBack = jest.fn();
    doStuffByTimeout(callBack, 1000);
    jest.advanceTimersByTime(1000);
    expect(callBack).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callBack = jest.fn();
    doStuffByTimeout(callBack, 1000);
    expect(callBack).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callBack).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callBack = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBack, 1000);
    expect(setInterval).toHaveBeenCalledWith(callBack, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callBack = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBack, 1000);
    jest.advanceTimersByTime(1000);
    expect(callBack).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callBack).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.mock('path', () => ({
      join: jest.fn(),
    }));
    const pathToFile = jest.spyOn(path, 'join');
    await readFileAsynchronously('123.txt');
    expect(pathToFile).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.mock('fs', () => ({
      existsSync: jest.fn(),
    }));
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('123.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.mock('fs', () => ({
      existsSync: jest.fn(),
    }));
    jest.mock('fs/promises', () => ({
      readFile: jest.fn(),
    }));
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsp, 'readFile').mockResolvedValue('');
    const result = await readFileAsynchronously('123.txt');
    expect(typeof result).toBe('string');
  });
});
