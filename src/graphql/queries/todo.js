import gql from 'graphql-tag';

export const GET_TODO = gql`
  query GetTodos {
    todos @client {
      id
      text
      completed
    }
  }
`;
