import { GET_PRODUCT, FRAGMENT_PRODUCT } from './gql'
import { GraphFragment, setTypeName } from '../../utils/Model';

// -----------------------------------------------------------
export const addProduct = (_, { text }, { cache }) => {
  const query = GET_PRODUCT
  const state = cache.readQuery({ query });
  const newData = setTypeName('ProductItem').create({ text, completed: false })
  const data = {
    products: [...state.products, newData],
  };
  cache.writeQuery({ query, data });
  return newData;
}


export const toggleProduct = (_root, variables, { cache, getCacheKey }) => {
  const fragment = FRAGMENT_PRODUCT
  const model = new GraphFragment(fragment, { cache, getCacheKey })
  model
    .findById(variables.id)
    .update(({ data: product, id }) => {
      const data = { ...product, completed: !product.completed };
      cache.writeData({ id, data });
    })
  return null;
};

export const deleteProduct = (_, { id }, { cache }) => {
  const query = GET_PRODUCT
  const state = cache.readQuery({ query });
  const data = {
    products: state.products.filter(item => item.id !== id),
  };
  cache.writeQuery({ query, data });
  return null;
}
