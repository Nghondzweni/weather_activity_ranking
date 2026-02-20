/**
 * Single hook for weather rankings — all forecast data fetching via this hook.
 */

import { useQuery } from '@apollo/client';
import { WEATHER_RANKINGS_QUERY } from '../apollo/queries';
import type { WeatherRankingsData, WeatherRankingsVariables } from '../apollo/types';

export function useWeatherRankings(city: string | null) {
  const result = useQuery<WeatherRankingsData, WeatherRankingsVariables>(
    WEATHER_RANKINGS_QUERY,
    {
      variables: { city: city ?? '' },
      skip: city === null || city.trim() === '',
    }
  );
  return {
    data: result.data,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}
