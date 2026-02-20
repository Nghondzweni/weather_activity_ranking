"use strict";
/**
 * Numeric thresholds for ranking logic (snowfall, wind, temp, weathercode).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMP_VERY_COLD_MAX = exports.INDOOR_PENALTY_PERFECT_WEATHER = exports.INDOOR_BOOST_VERY_COLD = exports.INDOOR_BOOST_RAIN_STORM = exports.INDOOR_BASE_SCORE = exports.WIND_HIGH_KMH = exports.OUTDOOR_PENALTY_HIGH_WIND = exports.SCORE_OUTDOOR_STORM = exports.SCORE_OUTDOOR_RAIN = exports.SCORE_OUTDOOR_PARTLY = exports.SCORE_OUTDOOR_CLEAR = exports.WEATHERCODE_STORM_MAX = exports.WEATHERCODE_STORM_MIN = exports.WEATHERCODE_RAIN_MAX = exports.WEATHERCODE_RAIN_MIN = exports.WEATHERCODE_PARTLY_CLOUDY_MAX = exports.WEATHERCODE_PARTLY_CLOUDY_MIN = exports.WEATHERCODE_CLEAR_MAX_OUTDOOR = exports.WEATHERCODE_CLEAR_MAX = exports.SURF_PENALTY_HEAVY_RAIN = exports.SURF_BOOST_CLEAR = exports.SCORE_SURF_DANGEROUS = exports.SCORE_SURF_POOR = exports.SCORE_SURF_IDEAL = exports.WIND_SURF_DANGEROUS_MIN = exports.WIND_SURF_POOR_MAX = exports.WIND_SURF_IDEAL_MAX = exports.WIND_SURF_IDEAL_MIN = exports.SKI_PENALTY_RAIN_NO_SNOW = exports.SKI_PENALTY_WARM = exports.SKI_BOOST_COLD = exports.TEMP_SKI_WARM_MIN = exports.TEMP_SKI_COLD_MAX = exports.SCORE_SNOW_20 = exports.SCORE_SNOW_10 = exports.SCORE_SNOW_5 = exports.SCORE_SNOW_0 = exports.SNOWFALL_BASE_20 = exports.SNOWFALL_BASE_10 = exports.SNOWFALL_BASE_5 = exports.SNOWFALL_BASE_0 = void 0;
// Skiing — snowfall (cm)
exports.SNOWFALL_BASE_0 = 0;
exports.SNOWFALL_BASE_5 = 5;
exports.SNOWFALL_BASE_10 = 10;
exports.SNOWFALL_BASE_20 = 20;
exports.SCORE_SNOW_0 = 0;
exports.SCORE_SNOW_5 = 60;
exports.SCORE_SNOW_10 = 80;
exports.SCORE_SNOW_20 = 100;
exports.TEMP_SKI_COLD_MAX = 2;
exports.TEMP_SKI_WARM_MIN = 5;
exports.SKI_BOOST_COLD = 10;
exports.SKI_PENALTY_WARM = -30;
exports.SKI_PENALTY_RAIN_NO_SNOW = -20;
// Surfing — wind (km/h)
exports.WIND_SURF_IDEAL_MIN = 15;
exports.WIND_SURF_IDEAL_MAX = 25;
exports.WIND_SURF_POOR_MAX = 10;
exports.WIND_SURF_DANGEROUS_MIN = 40;
exports.SCORE_SURF_IDEAL = 80;
exports.SCORE_SURF_POOR = 20;
exports.SCORE_SURF_DANGEROUS = 10;
exports.SURF_BOOST_CLEAR = 15;
exports.SURF_PENALTY_HEAVY_RAIN = -15;
exports.WEATHERCODE_CLEAR_MAX = 3;
// Outdoor sightseeing — weathercode (WMO)
exports.WEATHERCODE_CLEAR_MAX_OUTDOOR = 1;
exports.WEATHERCODE_PARTLY_CLOUDY_MIN = 2;
exports.WEATHERCODE_PARTLY_CLOUDY_MAX = 3;
exports.WEATHERCODE_RAIN_MIN = 61;
exports.WEATHERCODE_RAIN_MAX = 67;
exports.WEATHERCODE_STORM_MIN = 80;
exports.WEATHERCODE_STORM_MAX = 99;
exports.SCORE_OUTDOOR_CLEAR = 90;
exports.SCORE_OUTDOOR_PARTLY = 70;
exports.SCORE_OUTDOOR_RAIN = 30;
exports.SCORE_OUTDOOR_STORM = 10;
exports.OUTDOOR_PENALTY_HIGH_WIND = -20;
exports.WIND_HIGH_KMH = 40;
// Indoor sightseeing
exports.INDOOR_BASE_SCORE = 50;
exports.INDOOR_BOOST_RAIN_STORM = 30;
exports.INDOOR_BOOST_VERY_COLD = 10;
exports.INDOOR_PENALTY_PERFECT_WEATHER = -10;
exports.TEMP_VERY_COLD_MAX = 0;
