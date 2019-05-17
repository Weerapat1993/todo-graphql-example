import React from 'react';
import { AddTodo, TodoList } from './Todo';
import { AddProduct, ProductList } from './Product';
import { Container } from '../components';
import { connect } from '../utils/connect';

const Home = (props) => {
  const { todos, products } = props
  console.log(props)
  return (
    <Container>
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList todos={todos} />
      <h1>Product List</h1>
      <AddProduct />
      <ProductList products={products} />
      <pre>
        {JSON.stringify(props, null, '  ')}
      </pre>
    </Container>
  )
};

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  products: state.products,
})

export default connect(mapStateToProps)(Home);
