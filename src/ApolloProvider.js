import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
/* import { createHttpLink } from 'apollo-link-http'; */
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

/*
const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});
*/

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log( 'graphQLErrors', graphQLErrors)
    console.log( 'networkError', networkError)
  }
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
