"use strict";
/**
 * GraphQL schema — types and query only.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type ActivityRanking {
    activity: String!
    score: Float!
    label: String!
    reasoning: String!
  }

  type DayForecast {
    date: String!
    rankings: [ActivityRanking!]!
  }

  type CityForecast {
    city: String!
    country: String!
    days: [DayForecast!]!
  }

  type Query {
    weatherRankings(city: String!): CityForecast!
  }
`;
