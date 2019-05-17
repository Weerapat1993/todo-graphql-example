
import gql from 'graphql-tag';

export const FRAGMENT_PRODUCT = gql`
  fragment completeProduct on ProductItem {
    completed
    text
    id
  }
`;


export const GET_PRODUCT = gql`
  query GetProducts {
    products @client {
      id
      text
      completed
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($text: String!) {
    addProduct(text: $text) @client
  }
`;

export const TOGGLE_PRODUCT = gql`
  mutation ToggleProduct($id: String!) {
    toggleProduct(id: $id) @client
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) @client
  }
`;
