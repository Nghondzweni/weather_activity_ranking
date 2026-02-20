/**
 * Numeric thresholds for ranking logic (snowfall, wind, temp, weathercode).
 */

// Skiing — snowfall (cm)
export const SNOWFALL_BASE_0 = 0;
export const SNOWFALL_BASE_5 = 5;
export const SNOWFALL_BASE_10 = 10;
export const SNOWFALL_BASE_20 = 20;
export const SCORE_SNOW_0 = 0;
export const SCORE_SNOW_5 = 60;
export const SCORE_SNOW_10 = 80;
export const SCORE_SNOW_20 = 100;
export const TEMP_SKI_COLD_MAX = 2;
export const TEMP_SKI_WARM_MIN = 5;
export const SKI_BOOST_COLD = 10;
export const SKI_PENALTY_WARM = -30;
export const SKI_PENALTY_RAIN_NO_SNOW = -20;

// Surfing — wind (km/h)
export const WIND_SURF_IDEAL_MIN = 15;
export const WIND_SURF_IDEAL_MAX = 25;
export const WIND_SURF_POOR_MAX = 10;
export const WIND_SURF_DANGEROUS_MIN = 40;
export const SCORE_SURF_IDEAL = 80;
export const SCORE_SURF_POOR = 20;
export const SCORE_SURF_DANGEROUS = 10;
export const SURF_BOOST_CLEAR = 15;
export const SURF_PENALTY_HEAVY_RAIN = -15;
export const WEATHERCODE_CLEAR_MAX = 3;

// Outdoor sightseeing — weathercode (WMO)
export const WEATHERCODE_CLEAR_MAX_OUTDOOR = 1;
export const WEATHERCODE_PARTLY_CLOUDY_MIN = 2;
export const WEATHERCODE_PARTLY_CLOUDY_MAX = 3;
export const WEATHERCODE_RAIN_MIN = 61;
export const WEATHERCODE_RAIN_MAX = 67;
export const WEATHERCODE_STORM_MIN = 80;
export const WEATHERCODE_STORM_MAX = 99;
export const SCORE_OUTDOOR_CLEAR = 90;
export const SCORE_OUTDOOR_PARTLY = 70;
export const SCORE_OUTDOOR_RAIN = 30;
export const SCORE_OUTDOOR_STORM = 10;
export const OUTDOOR_PENALTY_HIGH_WIND = -20;
export const WIND_HIGH_KMH = 40;

// Indoor sightseeing
export const INDOOR_BASE_SCORE = 50;
export const INDOOR_BOOST_RAIN_STORM = 30;
export const INDOOR_BOOST_VERY_COLD = 10;
export const INDOOR_PENALTY_PERFECT_WEATHER = -10;
export const TEMP_VERY_COLD_MAX = 0;
