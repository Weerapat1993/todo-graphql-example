import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { QUERY_STORE } from '../graphql/store';
import { AddTodo, TodoList } from './Todo';
import { AddProduct, ProductList } from './Product';

const Home = () => (
  <Query query={QUERY_STORE}>
    {({ data: state, client }) => {
      const todos = state.todos || []
      const products = state.products || []
      console.log(state)
      return (
        <Fragment>
          <h1>Todo List</h1>
          <AddTodo />
          <TodoList todos={todos} />
          <h1>Product List</h1>
          <AddProduct />
          <ProductList products={products} />
          <pre>
            {JSON.stringify(state, null, '  ')}
          </pre>
        </Fragment>
      )
    }}
  </Query>
);

export default Home;
