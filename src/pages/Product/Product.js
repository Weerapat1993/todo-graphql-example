import React from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_PRODUCT } from '../../graphql/mutations/product';

const Product = ({ id, completed, text }) => (
  <Mutation mutation={TOGGLE_PRODUCT} variables={{ id }}>
    {toggleProduct => (
      <li
        onClick={toggleProduct}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {text}
      </li>
    )}
  </Mutation>
);

export default Product;