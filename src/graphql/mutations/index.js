import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import { GET_PRODUCT } from '../queries/product'

export const addTodo = (_, { text }, { cache }) => {
  const query = gql`
    query GetTodos {
      todos @client {
        id
        text
        completed
      }
    }
  `;

  const previous = cache.readQuery({ query });
  const newTodo = { id: uuidv4(), text, completed: false, __typename: 'TodoItem' };
  const data = {
    todos: [...previous.todos, newTodo],
  };

  // you can also do cache.writeData({ data }) here if you prefer
  cache.writeQuery({ query, data });
  return newTodo;
}

export const toggleTodo = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
  const fragment = gql`
    fragment completeTodo on TodoItem {
      completed
    }
  `;
  const todo = cache.readFragment({ fragment, id });
  const data = { ...todo, completed: !todo.completed };
  cache.writeData({ id, data });
  return null;
};

// -----------------------------------------------------------
export const addProduct = (_, { text }, { cache }) => {
  const previous = cache.readQuery({ query: GET_PRODUCT });
  const newProduct = { id: uuidv4(), text, completed: false, __typename: 'ProductItem' };
  const data = {
    products: [...previous.products, newProduct],
  };

  // you can also do cache.writeData({ data }) here if you prefer
  cache.writeQuery({ query: GET_PRODUCT, data });
  return newProduct;
}


export const toggleProduct = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: 'ProductItem', id: variables.id })
  const fragment = gql`
    fragment completeProduct on ProductItem {
      completed
    }
  `;
  const product = cache.readFragment({ fragment, id });
  const data = { ...product, completed: !product.completed };
  cache.writeData({ id, data });
  return null;
};
