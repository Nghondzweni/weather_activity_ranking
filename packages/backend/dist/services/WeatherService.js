"use strict";
/**
 * Fetches 7-day daily forecast from Open-Meteo using lat/lon.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';
const DAILY_PARAMS = 'daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,windspeed_10m_max,weathercode';
class WeatherService {
    constructor(client) {
        this.client = client;
    }
    async getDailyForecast(lat, lon) {
        try {
            const url = `${FORECAST_BASE}?latitude=${lat}&longitude=${lon}&${DAILY_PARAMS}&timezone=auto`;
            const data = await this.client.get(url);
            return data;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error('Failed to fetch weather forecast. Please try again.');
        }
    }
}
exports.WeatherService = WeatherService;
