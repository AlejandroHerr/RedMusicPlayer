import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from '../PureComponent';
import { Song } from 'mpd/core';

export default class PlayerInfo extends Component {
  render() {
    const { song } = this.props;

    return (
      <div className='player-info song-info'>
        <div className='song-cover'
          style={{
            backgroundImage: 'url(http://img2-ak.lst.fm/i/u/770x0/646a37b068804cdc98a3408e91b21d6a.jpg)',
          }}/>
        <h2 className='song-title'>{song.title}</h2>
        <h3 className='song-artist'>{song.artist}</h3>
      </div>);
  }
}

PlayerInfo.defaultProps = {
  song: new Song(),
};

PlayerInfo.propTypes = {
  song: ImmutablePropTypes.record,
};
