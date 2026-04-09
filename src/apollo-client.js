import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.othmanewp.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;