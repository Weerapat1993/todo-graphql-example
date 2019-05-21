import React, { PureComponent, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_PRODUCT } from '../../graphql/product/gql';
import { Button } from '../../components';

class AddProduct extends PureComponent {
  state = {
    text: '',
  }

  handleInput = (e) => {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text } = this.state;
    return (
      <Fragment>
        <Mutation mutation={ADD_PRODUCT} variables={{ text }}>
          {addProduct => (
            <div>
              <input onChange={this.handleInput} />
              <Button color="primary" onClick={addProduct}>Add</Button>
            </div>
          )}
        </Mutation>
      </Fragment>
    
    )
  }
}

export default AddProduct;
