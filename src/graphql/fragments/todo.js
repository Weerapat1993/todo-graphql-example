import gql from 'graphql-tag'

export const FRAGMENT_TODO = gql`
  fragment completeTodo on TodoItem {
    completed
  }
`;