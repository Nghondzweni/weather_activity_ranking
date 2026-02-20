/**
 * GraphQL resolvers — orchestration only; services injected via context.
 */

import { GraphQLError } from 'graphql';
import type { CityForecast, DayForecast } from './types';
import type { GeocodingService } from './services/GeocodingService';
import type { WeatherService } from './services/WeatherService';
import { rankDay, type DayWeatherInput } from './services/RankingService';

export interface AppContext {
  geocodingService: GeocodingService;
  weatherService: WeatherService;
}

export function createResolvers() {
  return {
    Query: {
      async weatherRankings(
        _: unknown,
        args: { city: string },
        context: AppContext
      ): Promise<CityForecast> {
        const { geocodingService, weatherService } = context;
        try {
          const coords = await geocodingService.getCoordinates(args.city);
          const forecast = await weatherService.getDailyForecast(coords.lat, coords.lon);
          const daily = forecast.daily;
          const days: DayForecast[] = [];
          for (let i = 0; i < daily.time.length; i++) {
            const dayWeather: DayWeatherInput = {
              date: daily.time[i],
              temperature_2m_max: daily.temperature_2m_max[i],
              temperature_2m_min: daily.temperature_2m_min[i],
              precipitation_sum: daily.precipitation_sum[i],
              snowfall_sum: daily.snowfall_sum[i],
              windspeed_10m_max: daily.windspeed_10m_max[i],
              weathercode: daily.weathercode[i],
            };
            days.push({
              date: dayWeather.date,
              rankings: rankDay(dayWeather),
            });
          }
          return {
            city: coords.name,
            country: coords.country,
            days,
          };
        } catch (err) {
          if (err instanceof Error) {
            throw new GraphQLError(err.message, {
              extensions: { code: 'BAD_USER_INPUT' },
            });
          }
          throw new GraphQLError('An unexpected error occurred.', {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          });
        }
      },
    },
  };
}
