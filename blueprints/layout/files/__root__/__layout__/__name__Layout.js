import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from 'components/PureComponent';

export default class <%= pascalEntityName %>Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        { children }
      </div>
    );
  }
}

<%= pascalEntityName %>Layout.defaultProps = {
};

<%= pascalEntityName %>Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};
