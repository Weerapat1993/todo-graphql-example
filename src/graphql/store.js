import gql from 'graphql-tag';

// Store
export const QUERY_STORE = gql`
  {
    todos @client {
      id
      completed
      text
    }
    product @client {
      id
      name
    }
  }
`;

// Initial State
export const inititalState = {
  todos: [],
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: false,
  },
  counter: 0,
  product: [],
}