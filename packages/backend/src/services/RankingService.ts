/**
 * Pure functions: convert one day's weather into activity scores.
 * No I/O; all logic and constants from constants/.
 */

import type { ActivityRanking } from '../types';
import {
  SKIING,
  SURFING,
  OUTDOOR_SIGHTSEEING,
  INDOOR_SIGHTSEEING,
} from '../constants/activities';
import { getLabelForScore } from '../constants/labels';
import {
  SCORE_SNOW_0,
  SCORE_SNOW_5,
  SCORE_SNOW_10,
  SCORE_SNOW_20,
  SNOWFALL_BASE_5,
  SNOWFALL_BASE_10,
  SNOWFALL_BASE_20,
  TEMP_SKI_COLD_MAX,
  TEMP_SKI_WARM_MIN,
  SKI_BOOST_COLD,
  SKI_PENALTY_WARM,
  SKI_PENALTY_RAIN_NO_SNOW,
  WIND_SURF_IDEAL_MIN,
  WIND_SURF_IDEAL_MAX,
  WIND_SURF_POOR_MAX,
  WIND_SURF_DANGEROUS_MIN,
  SCORE_SURF_IDEAL,
  SCORE_SURF_POOR,
  SCORE_SURF_DANGEROUS,
  SURF_BOOST_CLEAR,
  SURF_PENALTY_HEAVY_RAIN,
  WEATHERCODE_CLEAR_MAX,
  WEATHERCODE_CLEAR_MAX_OUTDOOR,
  WEATHERCODE_PARTLY_CLOUDY_MIN,
  WEATHERCODE_PARTLY_CLOUDY_MAX,
  WEATHERCODE_RAIN_MIN,
  WEATHERCODE_RAIN_MAX,
  WEATHERCODE_STORM_MIN,
  WEATHERCODE_STORM_MAX,
  SCORE_OUTDOOR_CLEAR,
  SCORE_OUTDOOR_PARTLY,
  SCORE_OUTDOOR_RAIN,
  SCORE_OUTDOOR_STORM,
  OUTDOOR_PENALTY_HIGH_WIND,
  WIND_HIGH_KMH,
  INDOOR_BASE_SCORE,
  INDOOR_BOOST_RAIN_STORM,
  INDOOR_BOOST_VERY_COLD,
  INDOOR_PENALTY_PERFECT_WEATHER,
  TEMP_VERY_COLD_MAX,
} from '../constants/ranking';

export interface DayWeatherInput {
  date: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  snowfall_sum: number;
  windspeed_10m_max: number;
  weathercode: number;
}

const SCORE_MIN = 0;
const SCORE_MAX = 100;

function clamp(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}

function scoreSkiing(d: DayWeatherInput): { score: number; reasoning: string } {
  let score: number;
  const snow = d.snowfall_sum;
  const precip = d.precipitation_sum;
  const rainWithoutSnow = precip > 0 && snow <= 0;

  if (snow >= SNOWFALL_BASE_20) score = SCORE_SNOW_20;
  else if (snow >= SNOWFALL_BASE_10) score = SCORE_SNOW_10;
  else if (snow >= SNOWFALL_BASE_5) score = SCORE_SNOW_5;
  else score = SCORE_SNOW_0;

  const reasons: string[] = [];
  if (d.temperature_2m_max < TEMP_SKI_COLD_MAX) {
    score += SKI_BOOST_COLD;
    reasons.push('cold conditions good for snow');
  }
  if (d.temperature_2m_max > TEMP_SKI_WARM_MIN) {
    score += SKI_PENALTY_WARM;
    reasons.push('too warm for skiing');
  }
  if (rainWithoutSnow) {
    score += SKI_PENALTY_RAIN_NO_SNOW;
    reasons.push('rain without snow');
  }
  const final = clamp(score);
  const reasoning = reasons.length > 0 ? reasons.join('; ') : `snowfall ${snow} cm, temp ${d.temperature_2m_max}°C`;
  return { score: final, reasoning };
}

function scoreSurfing(d: DayWeatherInput): { score: number; reasoning: string } {
  const wind = d.windspeed_10m_max;
  let score: number;
  if (wind >= WIND_SURF_IDEAL_MIN && wind <= WIND_SURF_IDEAL_MAX) score = SCORE_SURF_IDEAL;
  else if (wind < WIND_SURF_POOR_MAX) score = SCORE_SURF_POOR;
  else if (wind >= WIND_SURF_DANGEROUS_MIN) score = SCORE_SURF_DANGEROUS;
  else score = 50; // between poor and ideal

  if (d.weathercode <= WEATHERCODE_CLEAR_MAX) score += SURF_BOOST_CLEAR;
  const heavyRain =
    (d.weathercode >= WEATHERCODE_RAIN_MIN && d.weathercode <= WEATHERCODE_RAIN_MAX) ||
    (d.weathercode >= WEATHERCODE_STORM_MIN && d.weathercode <= WEATHERCODE_STORM_MAX);
  if (heavyRain) score += SURF_PENALTY_HEAVY_RAIN;

  const final = clamp(score);
  const reasoning = `wind ${wind} km/h, weathercode ${d.weathercode}`;
  return { score: final, reasoning };
}

function scoreOutdoorSightseeing(d: DayWeatherInput): { score: number; reasoning: string } {
  let score: number;
  if (d.weathercode <= WEATHERCODE_CLEAR_MAX_OUTDOOR) score = SCORE_OUTDOOR_CLEAR;
  else if (
    d.weathercode >= WEATHERCODE_PARTLY_CLOUDY_MIN &&
    d.weathercode <= WEATHERCODE_PARTLY_CLOUDY_MAX
  )
    score = SCORE_OUTDOOR_PARTLY;
  else if (d.weathercode >= WEATHERCODE_RAIN_MIN && d.weathercode <= WEATHERCODE_RAIN_MAX)
    score = SCORE_OUTDOOR_RAIN;
  else if (d.weathercode >= WEATHERCODE_STORM_MIN && d.weathercode <= WEATHERCODE_STORM_MAX)
    score = SCORE_OUTDOOR_STORM;
  else score = 50;

  if (d.windspeed_10m_max > WIND_HIGH_KMH) score += OUTDOOR_PENALTY_HIGH_WIND;
  const final = clamp(score);
  const reasoning = `weathercode ${d.weathercode}, wind ${d.windspeed_10m_max} km/h`;
  return { score: final, reasoning };
}

function scoreIndoorSightseeing(d: DayWeatherInput): { score: number; reasoning: string } {
  let score = INDOOR_BASE_SCORE;
  const rainOrStorm =
    (d.weathercode >= WEATHERCODE_RAIN_MIN && d.weathercode <= WEATHERCODE_RAIN_MAX) ||
    (d.weathercode >= WEATHERCODE_STORM_MIN && d.weathercode <= WEATHERCODE_STORM_MAX);
  if (rainOrStorm) score += INDOOR_BOOST_RAIN_STORM;
  if (d.temperature_2m_max < TEMP_VERY_COLD_MAX) score += INDOOR_BOOST_VERY_COLD;
  if (d.weathercode <= WEATHERCODE_CLEAR_MAX_OUTDOOR) score += INDOOR_PENALTY_PERFECT_WEATHER;
  const final = clamp(score);
  const reasoning = `weathercode ${d.weathercode}, temp ${d.temperature_2m_max}°C`;
  return { score: final, reasoning };
}

export function rankDay(day: DayWeatherInput): ActivityRanking[] {
  const skiing = scoreSkiing(day);
  const surfing = scoreSurfing(day);
  const outdoor = scoreOutdoorSightseeing(day);
  const indoor = scoreIndoorSightseeing(day);

  return [
    { activity: SKIING, score: skiing.score, label: getLabelForScore(skiing.score), reasoning: skiing.reasoning },
    { activity: SURFING, score: surfing.score, label: getLabelForScore(surfing.score), reasoning: surfing.reasoning },
    {
      activity: OUTDOOR_SIGHTSEEING,
      score: outdoor.score,
      label: getLabelForScore(outdoor.score),
      reasoning: outdoor.reasoning,
    },
    {
      activity: INDOOR_SIGHTSEEING,
      score: indoor.score,
      label: getLabelForScore(indoor.score),
      reasoning: indoor.reasoning,
    },
  ];
}
