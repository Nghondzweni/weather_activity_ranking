/**
 * Fetches lat/lon from Open-Meteo geocoding API.
 */

import type { GeocodingResponse } from '@repo/shared';
import type { HttpClient } from '../httpClient';

const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';

export interface CoordinatesResult {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export class GeocodingService {
  constructor(private readonly client: HttpClient) {}

  async getCoordinates(city: string): Promise<CoordinatesResult> {
    try {
      const url = `${GEOCODING_BASE}?name=${encodeURIComponent(city)}&count=1`;
      const data = await this.client.get<GeocodingResponse>(url);
      const results = data.results;
      if (!results || results.length === 0) {
        throw new Error(`No location found for "${city}". Try a different city or check the spelling.`);
      }
      const first = results[0];
      return {
        lat: first.latitude,
        lon: first.longitude,
        name: first.name,
        country: first.country ?? first.country_code ?? '',
      };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Failed to look up city. Please try again.');
    }
  }
}
