import uuidv4 from 'uuid/v4';
import { GET_TODO, FRAGMENT_TODO } from './gql'

export const addTodo = (_, { text }, { cache }) => {
  const query = GET_TODO
  const previous = cache.readQuery({ query });
  const newTodo = { id: uuidv4(), text, completed: false, __typename: 'TodoItem' };
  const data = {
    todos: [...previous.todos, newTodo],
  };
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

export const deleteTodo = (_, { id }, { cache }) => {
  const query = GET_TODO
  const state = cache.readQuery({ query });
  const data = {
    todos: state.todos.filter(item => item.id !== id),
  };

  // you can also do cache.writeData({ data }) here if you prefer
  cache.writeQuery({ query, data });
  return null;
}
