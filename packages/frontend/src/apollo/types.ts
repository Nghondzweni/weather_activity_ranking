/**
 * GraphQL result types for weather rankings.
 */

export interface ActivityRanking {
  activity: string;
  score: number;
  label: string;
  reasoning: string;
}

export interface DayForecast {
  date: string;
  rankings: ActivityRanking[];
}

export interface CityForecast {
  city: string;
  country: string;
  days: DayForecast[];
}

export interface WeatherRankingsData {
  weatherRankings: CityForecast;
}

export interface WeatherRankingsVariables {
  city: string;
}
