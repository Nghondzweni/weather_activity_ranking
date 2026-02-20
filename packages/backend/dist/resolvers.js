"use strict";
/**
 * GraphQL resolvers — orchestration only; services injected via context.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolvers = createResolvers;
const graphql_1 = require("graphql");
const RankingService_1 = require("./services/RankingService");
function createResolvers() {
    return {
        Query: {
            async weatherRankings(_, args, context) {
                const { geocodingService, weatherService } = context;
                try {
                    const coords = await geocodingService.getCoordinates(args.city);
                    const forecast = await weatherService.getDailyForecast(coords.lat, coords.lon);
                    const daily = forecast.daily;
                    const days = [];
                    for (let i = 0; i < daily.time.length; i++) {
                        const dayWeather = {
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
                            rankings: (0, RankingService_1.rankDay)(dayWeather),
                        });
                    }
                    return {
                        city: coords.name,
                        country: coords.country,
                        days,
                    };
                }
                catch (err) {
                    if (err instanceof Error) {
                        throw new graphql_1.GraphQLError(err.message, {
                            extensions: { code: 'BAD_USER_INPUT' },
                        });
                    }
                    throw new graphql_1.GraphQLError('An unexpected error occurred.', {
                        extensions: { code: 'INTERNAL_SERVER_ERROR' },
                    });
                }
            },
        },
    };
}
