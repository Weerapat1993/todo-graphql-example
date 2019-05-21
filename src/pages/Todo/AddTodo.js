import React, { PureComponent, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TODO } from '../../graphql/todo/gql';
import { Button } from '../../components';

class AddTodo extends PureComponent {
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
        <Mutation mutation={ADD_TODO} variables={{ text }}>
          {addProduct => (
            <div>
              <input onChange={this.handleInput} />
              <Button color="warning" onClick={addProduct}>Add</Button>
            </div>
          )}
        </Mutation>
      </Fragment>
    
    )
  }
}

export default AddTodo;
