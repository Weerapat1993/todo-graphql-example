import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages';
import { theme } from './config/theme';
import { inititalState } from './graphql/store';
import { Mutation } from './graphql/Mutation'
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from './styles/GlobalStyle';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  resolvers: { Mutation },
  defaults: inititalState,
});

const httpLink = new HttpLink({ uri: '/graphql' })
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Home />
      </Fragment>
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
