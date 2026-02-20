"use strict";
/**
 * Fetches lat/lon from Open-Meteo geocoding API.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodingService = void 0;
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
class GeocodingService {
    constructor(client) {
        this.client = client;
    }
    async getCoordinates(city) {
        try {
            const url = `${GEOCODING_BASE}?name=${encodeURIComponent(city)}&count=1`;
            const data = await this.client.get(url);
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
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error('Failed to look up city. Please try again.');
        }
    }
}
exports.GeocodingService = GeocodingService;
