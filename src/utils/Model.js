import uuidv4 from 'uuid/v4';
import { get } from 'lodash';

export class GraphModel {
  constructor(state) {
    this.state = state;
    this.typename = null;
    const table = get(Object.keys(state), '0', null);
    this.table = table;
  };

  setType = (name) => {
    this.typename = name;
    return this
  }

  create = (variables) => {
    const newState = {
      __typename: this.typename,
      id: uuidv4(),
      ...variables
    }
    // const data = {
    //   [this.table]: [...this.state[this.table], newState],
    // };
    // .cache.writeQuery({ query: variables, data });
    return newState;
  }
}

// const model = new GraphModel(cache)

// model
//   .setTable('products')
//   .setType('ProductItem')
//   .create({ text })
