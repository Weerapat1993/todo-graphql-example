# Local State Management (GraphQL)

Credit : [Apollo GraphQL : Local State Management](https://www.apollographql.com/docs/react/essentials/local-state)

**Table of Content**

- [Local State Management (GraphQL)](#local-state-management-graphql)
  - [Managing the cache](#managing-the-cache)
  - [Querying local state](#querying-local-state)
  - [Updating local state](#updating-local-state)

## Managing the cache

When you're using Apollo Client to work with local state, your Apollo cache becomes the single source of truth for all of your local and remote data. The [Apollo cache API](https://www.apollographql.com/docs/react/advanced/caching.html) has several methods that can assist you with updating and retrieving data. Let's walk through the most relevant methods, and explore some common use cases for each one.

**Folder Structure**

```markdown
.
├── Mutation.js
├── store.js
└── todo
    ├── gql.js
    ├── index.js
    └── resolvers.js
```

**Step 1 : Create Query Store**

Create query store when you're using local state in Apollo Client. And set `initialState` for initial data in store

**store.js**

```jsx
import gql from 'graphql-tag';

// Store
export const QUERY_STORE = gql`
  {
    todos @client {
      id
      completed
      text
    }
  }
`;

// Initial State
export const inititalState = {
  todos: [],
};
```

**Step 2 : Create Mutation**

First, Create Query `GET_TODO` for fetch data `todos` in local state.
Next, Create Mutation `ADD_TODO` for insert data `todos` in local state.
Then, Create Mutation `TOGGLE_TODO` for update data `todos` in local state.
Finally, Create Mutation `DELETE_TODO` for delete data `todos` in local state.

**gql.js**

```jsx
import gql from 'graphql-tag'

export const GET_TODO = gql`
  query GetTodos {
    todos @client {
      id
      text
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!) {
    toggleTodo(id: $id) @client
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) @client
  }
`;
```

**Step 3 : Create Resolver for updating local state**

First, Create resolver `addTodo` for insert data `todos` in local state.
Next, Create resolver `toggleTodo` for update data `todos` in local state.
Finally, Create resolver `deleteTodo` for delete data `todos` in local state.

**resolvers.js**

```jsx
import uuidv4 from 'uuid/v4';
import gql from 'graphql-tag'
import { GET_TODO, FRAGMENT_TODO } from './gql'

// Fragment
const FRAGMENT_TODO = gql`
  fragment completeTodo on TodoItem {
    completed
  }
`;

// Utiliy Function
const setTypeName = (newState) => ({
  __typename: 'TodoItem',
  ...newState,
})

export const addTodo = (_, { text }, { cache }) => {
  // fetch query `todos` in store
  const query = GET_TODO
  const previous = cache.readQuery({ query });
  // create new todo
  const newTodo = setTypeName({ 
    id: uuidv4(), 
    text, 
    completed: false,
  });
  // rewrite query `todos` in store
  const data = {
    todos: [...previous.todos, newTodo],
  };
  cache.writeQuery({ query, data });
  return newTodo;
}

export const toggleTodo = (_root, variables, { cache, getCacheKey }) => {
  // find cache key by `__typename` and `id` in store
  const id = getCacheKey(setTypeName({ id: variables.id }))
  // find query `todo` by ID in store
  const fragment = FRAGMENT_TODO;
  const todo = cache.readFragment({ fragment, id });
  // update data `todo` by ID in store
  const data = { 
    ...todo, 
    completed: !todo.completed,
  };
  cache.writeData({ id, data });
  return null;
};

export const deleteTodo = (_, { id }, { cache }) => {
  // fetch query `todos` in store
  const query = GET_TODO
  const state = cache.readQuery({ query });
  // remove `todo` by ID in store
  const data = {
    todos: state.todos.filter(item => item.id !== id),
  };
  cache.writeQuery({ query, data });
  return null;
}
```

**Step 4 : Export and Combine Resolver**

Export resolver in`index.js`

**index.js**

```jsx
import * as todoResolvers from './resolvers';

export { todoResolvers };
```

Then, combine resolver in `Mutation.js`

**Mutation.js**

```jsx
import { todoResolvers } from './todo';

export const Mutation = {
  ...todoResolvers,
};
```

Finally, You must import `Mutation`in element `ApolloProvider`(If you provided this file. You can skip this step.)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Memory Cache
const cache = new InMemoryCache();

// Local State Management
const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation
  },
  defaults: inititalState,
});

// Http Link
const httpLink = new HttpLink({ uri: '...' })

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink]),
});

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
```

## Querying local state

Querying for local data is very similar to querying your GraphQL server. The only difference is that you add a `@client` directive on your local fields to indicate they should be resolved from the Apollo Client cache or a local resolver function. Let's look at an example:

```jsx
import React, { PureComponent } from 'react'
import { Query } from 'react-apollo';
import { QUERY_STORE } from '../graphql/store'

class Home extends PureComponent {
  render() {
    return (
      <Query query={QUERY_STORE}>
        {({ data: state, client }) => (
          ...
        )}
      </Query>
    )
  }
}
```

**Or Use `connectStore` in Utility Fucntion**

```jsx
import React, { PureComponent } from 'react'
import { connectStore } from '@cto-core/core-ui'

class Home extends PureComponent {
  render() {
    const { todos, products } = this.props;
    return (
      ...
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  products: state.products,
})

export default connectStore(mapStateToProps, QUERY_STORE)(Home);
```

## Updating local state

When you're updating todo in local state. You must use `Mutation` in Apollo Client for call function to resolver

**AddTodo.js**

```jsx
import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TODO } from '../../graphql/todo/gql';
import { Button } from '../../components';

class AddTodo extends PureComponent {
  state = {
    text: '',
  }

  handleInput = (e) => {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text } = this.state;
    return (
      <Mutation mutation={ADD_TODO} variables={{ text }}>
        {addProduct => (
          <div>
            <input onChange={this.handleInput} />
            <Button color="warning" onClick={addProduct}>Add</Button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default AddTodo;
```
