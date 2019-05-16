import React from 'react';
import Product from './Product'

const ProductList = ({ products }) => (
  <ul>
    {products.map(product => (
      <Product key={product.id} {...product} />
    ))}
  </ul>
)

export default ProductList;