/**
 * GraphQL schema — types and query only.
 */

export const typeDefs = `#graphql
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
