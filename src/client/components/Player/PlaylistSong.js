import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from '../PureComponent';
import { Element } from 'react-scroll/lib/mixins/Helpers';

class PlaylistSong extends Component {
  render() {
    const { song } = this.props;

    return (
      <li><div className='song-info'>
        <h2 className='song-title'>{song.title}</h2>
        <h3 className='song-artist'>{song.artist}</h3>
      </div></li>
    );
  }
}

PlaylistSong.propTypes = {
  song: ImmutablePropTypes.record.isRequired,
};

export default Element(PlaylistSong);
