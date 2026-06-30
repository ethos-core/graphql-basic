import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { relayStylePagination, offsetLimitPagination } from '@apollo/client/utilities';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination(['filter']),
          comments: offsetLimitPagination(['postId']),
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});
