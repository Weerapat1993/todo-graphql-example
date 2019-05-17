import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components'
import { TOGGLE_PRODUCT, DELETE_PRODUCT } from '../../graphql/mutations/product';

const Text = styled.span`
  color: ${props => props.color || 'white'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const Product = ({ id, completed, text }) => (
  <Mutation mutation={TOGGLE_PRODUCT} variables={{ id }}>
    {toggleProduct => (
      <li>
        <Text onClick={toggleProduct} completed={completed}>{text}</Text> &nbsp;
        <Mutation mutation={DELETE_PRODUCT} variables={{ id }}>
          {deleteProduct => (
            <Text onClick={deleteProduct} color="red">X</Text>
          )}
        </Mutation>
      </li>
    )}
  </Mutation>
);

export default Product;