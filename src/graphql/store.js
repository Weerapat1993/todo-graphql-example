import gql from 'graphql-tag';

// Store
export const QUERY_STORE = gql`
  {
    todos @client {
      id
      completed
      text
    }
    products @client {
      id
      completed
      text
    }
  }
`;

// Initial State
export const inititalState = {
  todos: [],
  products: [],
}