import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { QUERY_STORE } from '../graphql/store'

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperComponent) => {
  class HOC extends PureComponent {
    render() {
      return (
        <Query query={QUERY_STORE}>
          {({ data: state, client }) => {
            const stateToProps = mapStateToProps(state, this.props)
            return (
              <WrapperComponent {...stateToProps} {...this.props} />
            )
          }}
        </Query>
      )
    }
  }
  return HOC;
}