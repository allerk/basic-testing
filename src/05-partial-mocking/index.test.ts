// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const log = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const createSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(createSpy).toHaveBeenCalledWith('I am not mocked');
    createSpy.mockRestore();
  });
});
