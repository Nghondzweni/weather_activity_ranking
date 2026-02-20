/**
 * Fetches 7-day daily forecast from Open-Meteo using lat/lon.
 */

import type { DailyForecastResponse } from '@repo/shared';
import type { HttpClient } from '../httpClient';

const FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';
const DAILY_PARAMS =
  'daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,windspeed_10m_max,weathercode';

export class WeatherService {
  constructor(private readonly client: HttpClient) {}

  async getDailyForecast(lat: number, lon: number): Promise<DailyForecastResponse> {
    try {
      const url = `${FORECAST_BASE}?latitude=${lat}&longitude=${lon}&${DAILY_PARAMS}&timezone=auto`;
      const data = await this.client.get<DailyForecastResponse>(url);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Failed to fetch weather forecast. Please try again.');
    }
  }
}
