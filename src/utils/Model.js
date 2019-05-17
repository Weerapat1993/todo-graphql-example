import uuidv4 from 'uuid/v4';
import { get } from 'lodash';

export const setTypeName = (typename) => ({
  create: (variables) => {
    const newState = {
      __typename: typename,
      id: uuidv4(),
      ...variables
    }
    return newState;
  }
})

export class GraphFragment {
  constructor(fragment, cache) {
    this.fragment = fragment
    this.typename = get(fragment, 'definitions.0.typeCondition.name.value', null);
    this.id = null;
    this.cache = cache.cache;
    this.getCacheKey = cache.getCacheKey
  };

  findById(id) {
    this.id = this.getCacheKey({ __typename: this.typename, id })
    return this;
  }
  update(callback) {
    const data = this.cache.readFragment({ fragment: this.fragment, id: this.id });
    callback({ data, id: this.id })
  }
}