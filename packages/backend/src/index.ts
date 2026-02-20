/**
 * Apollo Server bootstrap — wires httpClient, services, schema, resolvers.
 */

import { ApolloServer } from 'apollo-server';
import { httpClient } from './httpClient';
import { GeocodingService } from './services/GeocodingService';
import { WeatherService } from './services/WeatherService';
import { typeDefs } from './schema';
import { createResolvers } from './resolvers';
import type { AppContext } from './resolvers';

const geocodingService = new GeocodingService(httpClient);
const weatherService = new WeatherService(httpClient);
const context: AppContext = { geocodingService, weatherService };

const server = new ApolloServer({
  typeDefs,
  resolvers: createResolvers(),
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
