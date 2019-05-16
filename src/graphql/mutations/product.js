
import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
  mutation AddProduct($text: String!) {
    addProduct(text: $text) @client
  }
`;


export const TOGGLE_PRODUCT = gql`
  mutation ToggleProduct($id: Int!) {
    toggleProduct(id: $id) @client
  }
`;

