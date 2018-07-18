import React from 'react';
import { render } from 'react-dom';
import { AppRegistry, Platform } from 'react-native';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const link = createHttpLink({
  uri: `http://localhost:4000`
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

const HybridApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Platform.OS !== 'ios' &&
  Platform.OS !== 'android' &&
  render(<HybridApp />, document.getElementById('root'));

export default HybridApp;
