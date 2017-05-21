import React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

export default class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }
}
