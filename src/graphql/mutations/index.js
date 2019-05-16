import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import { GET_PRODUCT } from '../queries/product'
import { GET_TODO } from '../queries/todo'
import { FRAGMENT_TODO } from '../fragments/todo';

export const addTodo = (_, { text }, { cache }) => {
  const query = GET_TODO
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
  const fragment = FRAGMENT_TODO;
  const todo = cache.readFragment({ fragment, id });
  const data = { ...todo, completed: !todo.completed };
  cache.writeData({ id, data });
  return null;
};

// -----------------------------------------------------------
export const addProduct = (_, { text }, { cache }) => {
  const query = GET_PRODUCT
  const previous = cache.readQuery({ query });
  const newProduct = { id: uuidv4(), text, completed: false, __typename: 'ProductItem' };
  const data = {
    products: [...previous.products, newProduct],
  };

  // you can also do cache.writeData({ data }) here if you prefer
  cache.writeQuery({ query, data });
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