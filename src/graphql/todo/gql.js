import gql from 'graphql-tag'

export const FRAGMENT_TODO = gql`
  fragment completeTodo on TodoItem {
    completed
  }
`;

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