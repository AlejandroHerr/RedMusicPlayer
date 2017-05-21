import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from './PureComponent';
import Artists from './Artists';
import Albums from './Albums';

export default class Library extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }
  render() {
    const { fetch, lib } = this.props;

    return (
      <div><button onClick={fetch.bind()}>{'Update'}</button>
        <Artists artists={lib.get('artists')} scope={lib.getIn(['scope', 'artist'])}/>
        <Albums albums={lib.get('albums')}/>
      </div>
    );
  }
}

Library.defaultProps = {
};

Library.propTypes = {
  fetch: React.PropTypes.func.isRequired,
  lib: ImmutablePropTypes.record.isRequired,
};
