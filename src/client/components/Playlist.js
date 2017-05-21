import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from './PureComponent';

export default class Playlist extends Component {

  render() {
    const { playlist } = this.props;

    return (
      <div>
        {playlist.songs.map((song) => {
          return (<p key={song.pos}>{song.title}</p>);
        })}
      </div>
    );
  }
}

Playlist.defaultProps = {
};

Playlist.propTypes = {
  playlist: ImmutablePropTypes.record.isRequired,
};
