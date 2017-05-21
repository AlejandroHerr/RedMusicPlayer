import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from './PureComponent';
import Album from './Album';

export default class Albums extends Component {
  render() {
    const { albums } = this.props;

    return (
      <div style={ { width: '80%' } }>
        { albums.map((album, idx) => (<Album album={album} key={idx}/>))}
      </div>
    );
  }
}

Albums.defaultProps = {
};

Albums.propTypes = {
  albums: ImmutablePropTypes.list.isRequired,
};
