import React from 'react';
import { Provider } from 'react-redux';
import Main from './containers/Main';

export default class Root extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
};
