// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';
import axios from 'axios';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const instance = axios.create;
    (instance as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: {
          id: 1,
          title: 'some data',
        },
      }),
    });

    await throttledGetDataFromApi('/testPath');
    expect(instance).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const instance = axios.create;
    (instance as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: {
          id: 1,
          title: 'some data',
        },
      }),
    });
    await throttledGetDataFromApi('/testPath');
    expect(instance().get).toBeCalledWith('/testPath');
  });

  test('should return response data', async () => {
    const instance = axios.create;
    (instance as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: {
          id: 1,
          title: 'some data',
        },
      }),
    });
    const data = await throttledGetDataFromApi('/testPath');

    expect(data).toStrictEqual({ id: 1, title: 'some data' });
  });
});
