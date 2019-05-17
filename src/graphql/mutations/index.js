import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import { GET_PRODUCT } from '../queries/product'
import { GET_TODO } from '../queries/todo'
import { FRAGMENT_TODO } from '../fragments/todo';
import { GraphFragment, setTypeName } from '../../utils/Model';

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
  const state = cache.readQuery({ query });
  const newData = setTypeName('ProductItem').create({ text, completed: false })
  const data = {
    products: [...state.products, newData],
  };
  cache.writeQuery({ query, data });
  return newData;
}


export const toggleProduct = (_root, variables, { cache, getCacheKey }) => {
  const fragment = gql`
    fragment completeProduct on ProductItem {
      completed
      text
      id
    }
  `;
  const model = new GraphFragment(fragment, { cache, getCacheKey })
  model
    .findById(variables.id)
    .update(({ data: product, id }) => {
      const data = { ...product, completed: !product.completed };
      cache.writeData({ id, data });
    })
  return null;
};

export const deleteProduct = (_, { id }, { cache }) => {
  const query = GET_PRODUCT
  const state = cache.readQuery({ query });
  const data = {
    products: state.products.filter(item => item.id !== id),
  };
  cache.writeQuery({ query, data });
  return null;
}
