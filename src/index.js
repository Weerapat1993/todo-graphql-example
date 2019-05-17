import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages';
import { theme } from './config/theme';
import { inititalState } from './graphql/store';
import { toggleTodo, addTodo, addProduct, toggleProduct } from './graphql/mutations';
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from './styles/GlobalStyle';


const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      addTodo,
      toggleTodo,

      addProduct,
      toggleProduct,
      
    },
  },
});

cache.writeData({ data: inititalState });
client.onResetStore(() => cache.writeData({ data: inititalState }));

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
