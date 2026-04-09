import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderWrapper;
