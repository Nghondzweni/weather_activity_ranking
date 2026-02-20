/**
 * Single HTTP client wrapper for all external requests.
 * Easy to mock in tests.
 */

import axios, { AxiosInstance } from 'axios';

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}

function createHttpClient(): HttpClient {
  const instance: AxiosInstance = axios.create({
    timeout: 10000,
    headers: { 'Accept': 'application/json' },
  });

  return {
    async get<T>(url: string): Promise<T> {
      const response = await instance.get<T>(url);
      return response.data;
    },
  };
}

export const httpClient: HttpClient = createHttpClient();
