/**
 * Apollo Client — single instance for the app.
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const graphqlUri =
  typeof import.meta.env.VITE_GRAPHQL_URI === 'string' && import.meta.env.VITE_GRAPHQL_URI.length > 0
    ? import.meta.env.VITE_GRAPHQL_URI
    : '/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
    fetch,
  }),
  cache: new InMemoryCache(),
});
