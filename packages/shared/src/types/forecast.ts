/**
 * Open-Meteo Forecast API daily response shapes.
 * @see https://api.open-meteo.com/v1/forecast
 */

export interface DailyForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    windspeed_10m_max: number[];
    weathercode: number[];
  };
}
