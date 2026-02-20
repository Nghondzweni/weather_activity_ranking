/**
 * GraphQL documents — weatherRankings query.
 */

import { gql } from '@apollo/client';

export const WEATHER_RANKINGS_QUERY = gql`
  query WeatherRankings($city: String!) {
    weatherRankings(city: $city) {
      city
      country
      days {
        date
        rankings {
          activity
          score
          label
          reasoning
        }
      }
    }
  }
`;
