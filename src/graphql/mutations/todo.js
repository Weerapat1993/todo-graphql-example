
import gql from 'graphql-tag';

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client
  }
`;


export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

