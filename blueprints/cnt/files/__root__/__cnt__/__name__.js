import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { } from '../actions';

class <%= pascalEntityName %> extends React.Component {
  render() {

    return (
      <div></div>
    );
  }
}

<%= pascalEntityName %>.defaultProps = {};

<%= pascalEntityName %>.propTypes = {};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps, false, { pure: true })(<%= pascalEntityName %>);
