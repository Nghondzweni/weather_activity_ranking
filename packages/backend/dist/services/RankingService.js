"use strict";
/**
 * Pure functions: convert one day's weather into activity scores.
 * No I/O; all logic and constants from constants/.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankDay = rankDay;
const activities_1 = require("../constants/activities");
const labels_1 = require("../constants/labels");
const ranking_1 = require("../constants/ranking");
const SCORE_MIN = 0;
const SCORE_MAX = 100;
function clamp(score) {
    return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score)));
}
function scoreSkiing(d) {
    let score;
    const snow = d.snowfall_sum;
    const precip = d.precipitation_sum;
    const rainWithoutSnow = precip > 0 && snow <= 0;
    if (snow >= ranking_1.SNOWFALL_BASE_20)
        score = ranking_1.SCORE_SNOW_20;
    else if (snow >= ranking_1.SNOWFALL_BASE_10)
        score = ranking_1.SCORE_SNOW_10;
    else if (snow >= ranking_1.SNOWFALL_BASE_5)
        score = ranking_1.SCORE_SNOW_5;
    else
        score = ranking_1.SCORE_SNOW_0;
    const reasons = [];
    if (d.temperature_2m_max < ranking_1.TEMP_SKI_COLD_MAX) {
        score += ranking_1.SKI_BOOST_COLD;
        reasons.push('cold conditions good for snow');
    }
    if (d.temperature_2m_max > ranking_1.TEMP_SKI_WARM_MIN) {
        score += ranking_1.SKI_PENALTY_WARM;
        reasons.push('too warm for skiing');
    }
    if (rainWithoutSnow) {
        score += ranking_1.SKI_PENALTY_RAIN_NO_SNOW;
        reasons.push('rain without snow');
    }
    const final = clamp(score);
    const reasoning = reasons.length > 0 ? reasons.join('; ') : `snowfall ${snow} cm, temp ${d.temperature_2m_max}°C`;
    return { score: final, reasoning };
}
function scoreSurfing(d) {
    const wind = d.windspeed_10m_max;
    let score;
    if (wind >= ranking_1.WIND_SURF_IDEAL_MIN && wind <= ranking_1.WIND_SURF_IDEAL_MAX)
        score = ranking_1.SCORE_SURF_IDEAL;
    else if (wind < ranking_1.WIND_SURF_POOR_MAX)
        score = ranking_1.SCORE_SURF_POOR;
    else if (wind >= ranking_1.WIND_SURF_DANGEROUS_MIN)
        score = ranking_1.SCORE_SURF_DANGEROUS;
    else
        score = 50; // between poor and ideal
    if (d.weathercode <= ranking_1.WEATHERCODE_CLEAR_MAX)
        score += ranking_1.SURF_BOOST_CLEAR;
    const heavyRain = (d.weathercode >= ranking_1.WEATHERCODE_RAIN_MIN && d.weathercode <= ranking_1.WEATHERCODE_RAIN_MAX) ||
        (d.weathercode >= ranking_1.WEATHERCODE_STORM_MIN && d.weathercode <= ranking_1.WEATHERCODE_STORM_MAX);
    if (heavyRain)
        score += ranking_1.SURF_PENALTY_HEAVY_RAIN;
    const final = clamp(score);
    const reasoning = `wind ${wind} km/h, weathercode ${d.weathercode}`;
    return { score: final, reasoning };
}
function scoreOutdoorSightseeing(d) {
    let score;
    if (d.weathercode <= ranking_1.WEATHERCODE_CLEAR_MAX_OUTDOOR)
        score = ranking_1.SCORE_OUTDOOR_CLEAR;
    else if (d.weathercode >= ranking_1.WEATHERCODE_PARTLY_CLOUDY_MIN &&
        d.weathercode <= ranking_1.WEATHERCODE_PARTLY_CLOUDY_MAX)
        score = ranking_1.SCORE_OUTDOOR_PARTLY;
    else if (d.weathercode >= ranking_1.WEATHERCODE_RAIN_MIN && d.weathercode <= ranking_1.WEATHERCODE_RAIN_MAX)
        score = ranking_1.SCORE_OUTDOOR_RAIN;
    else if (d.weathercode >= ranking_1.WEATHERCODE_STORM_MIN && d.weathercode <= ranking_1.WEATHERCODE_STORM_MAX)
        score = ranking_1.SCORE_OUTDOOR_STORM;
    else
        score = 50;
    if (d.windspeed_10m_max > ranking_1.WIND_HIGH_KMH)
        score += ranking_1.OUTDOOR_PENALTY_HIGH_WIND;
    const final = clamp(score);
    const reasoning = `weathercode ${d.weathercode}, wind ${d.windspeed_10m_max} km/h`;
    return { score: final, reasoning };
}
function scoreIndoorSightseeing(d) {
    let score = ranking_1.INDOOR_BASE_SCORE;
    const rainOrStorm = (d.weathercode >= ranking_1.WEATHERCODE_RAIN_MIN && d.weathercode <= ranking_1.WEATHERCODE_RAIN_MAX) ||
        (d.weathercode >= ranking_1.WEATHERCODE_STORM_MIN && d.weathercode <= ranking_1.WEATHERCODE_STORM_MAX);
    if (rainOrStorm)
        score += ranking_1.INDOOR_BOOST_RAIN_STORM;
    if (d.temperature_2m_max < ranking_1.TEMP_VERY_COLD_MAX)
        score += ranking_1.INDOOR_BOOST_VERY_COLD;
    if (d.weathercode <= ranking_1.WEATHERCODE_CLEAR_MAX_OUTDOOR)
        score += ranking_1.INDOOR_PENALTY_PERFECT_WEATHER;
    const final = clamp(score);
    const reasoning = `weathercode ${d.weathercode}, temp ${d.temperature_2m_max}°C`;
    return { score: final, reasoning };
}
function rankDay(day) {
    const skiing = scoreSkiing(day);
    const surfing = scoreSurfing(day);
    const outdoor = scoreOutdoorSightseeing(day);
    const indoor = scoreIndoorSightseeing(day);
    return [
        { activity: activities_1.SKIING, score: skiing.score, label: (0, labels_1.getLabelForScore)(skiing.score), reasoning: skiing.reasoning },
        { activity: activities_1.SURFING, score: surfing.score, label: (0, labels_1.getLabelForScore)(surfing.score), reasoning: surfing.reasoning },
        {
            activity: activities_1.OUTDOOR_SIGHTSEEING,
            score: outdoor.score,
            label: (0, labels_1.getLabelForScore)(outdoor.score),
            reasoning: outdoor.reasoning,
        },
        {
            activity: activities_1.INDOOR_SIGHTSEEING,
            score: indoor.score,
            label: (0, labels_1.getLabelForScore)(indoor.score),
            reasoning: indoor.reasoning,
        },
    ];
}
