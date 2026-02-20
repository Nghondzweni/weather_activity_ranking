"use strict";
/**
 * Apollo Server bootstrap — wires httpClient, services, schema, resolvers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const httpClient_1 = require("./httpClient");
const GeocodingService_1 = require("./services/GeocodingService");
const WeatherService_1 = require("./services/WeatherService");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const geocodingService = new GeocodingService_1.GeocodingService(httpClient_1.httpClient);
const weatherService = new WeatherService_1.WeatherService(httpClient_1.httpClient);
const context = { geocodingService, weatherService };
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: (0, resolvers_1.createResolvers)(),
    context: () => context,
});
const PORT = process.env.PORT ?? 4000;
server
    .listen({ port: PORT })
    .then(({ url }) => {
    console.log(`Server ready at ${url}`);
})
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
