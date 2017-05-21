import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-fa';
import Component from './PureComponent';
import Playlist from './Player/Playlist';
import PlayerInfo from './Player/PlayerInfo';
import PlayerProgressBar from './Player/PlayerProgressBar';
import PlayerControls from './Player/PlayerControls';
import './Player.less';

export default class Player extends Component {
  render() {
    const { status, playlist, playerActions, timerActions, timer, progressbarActions, updateEffect, showVolume } = this.props;
    //const nextSong = status.song + 1 < status.playlistlength ? playlist.songs.get(status.song + 1) : playlist.songs.get(status.playlistlength - 1);
    const nextSong = status.nextSong === -1 ? playlist.songs.get(status.song) : playlist.songs.get(status.nextsong);
    const previousSong = status.song === 0 ? playlist.songs.get(0) : playlist.songs.get(status.song - 1);
    //console.log(playlist);
    return (
      <div className='focus-container focus-player boxed'>
        <div className='inner'>
          <div className='player'>
            <div className='inner'>
              <div className='player-interface'>
                <div className='interface-wrap'>
                  <PlayerInfo song={playlist.songs.get(status.song)}/>
                  <PlayerProgressBar timerActions={timerActions} status={status} timer={timer} actions={progressbarActions} refresh={playerActions.refresh}/>
                  <PlayerControls
                    nextSong={nextSong}
                    previousSong={previousSong}
                    playlistLength={status.playlistlength}
                    position={status.song}
                    status={status}
                    actions={playerActions}
                    showVolume={showVolume}
                    updateEffect={updateEffect}/>
                </div>
              </div>
              <Playlist playlist={playlist}/>
            </div>
          </div>
        </div>
      </div>);
  }
}

Player.defaultProps = {
};

Player.propTypes = {
  status: ImmutablePropTypes.record.isRequired,
  timer: ImmutablePropTypes.record.isRequired,
  timerActions: React.PropTypes.shape({
    kill: React.PropTypes.func.isRequired,
    start: React.PropTypes.func.isRequired,
    tick: React.PropTypes.func.isRequired,
  }),
  updateEffect: React.PropTypes.func.isRequired,
};
