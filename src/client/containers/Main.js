import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import {
  playerStatus,
  startTimer,
  killTimer,
  tickTimer,
  playerPlay,
  playerToggle,
  playerStop,
  playerSeek,
  playerNext,
  playerPrevious,
  playerChange,
  playerChangePlayback,
  playerSetvol,
  updateEffect,
} from '../actions';
import '../styles/Main.less';

class Main extends React.Component {
  render() {
    const { playlist, playerState, playerActions, timerActions, progressbarActions, showVolume, updateEffect } = this.props;

    return (
      <div>
        <Player status={playerState.get('status')} timer={playerState.get('timer')} playerActions={playerActions} timerActions={timerActions} playlist={playlist} progressbarActions={progressbarActions} showVolume={showVolume} updateEffect={updateEffect}/>
        <Playlist playlist={playlist}/>
      </div>
    );
  }
}

Main.defaultProps = {};

Main.propTypes = {};

const mapStateToProps = (state) => ({
  playerState: state.player,
  playlist: state.playlist,
  showVolume: state.effects.get('showVolume'),
});
const mapDispatchToProps = (dispatch) => ({
  timerActions: {
    start: (start) => dispatch(startTimer(start)),
    kill: () => dispatch(killTimer()),
    tick: () => dispatch(tickTimer()),
  },
  progressbarActions: {
    seek: (elapsed) => dispatch(playerSeek(elapsed)),
  },
  playerActions: {
    refresh: () => dispatch(playerStatus()),
    change: (song) => dispatch(playerChange(song)),
    changePlayback: (key, value) => dispatch(playerChangePlayback(key, value)),
    play: (position) => dispatch(playerPlay(position)),
    setvol: (value) => dispatch(playerSetvol(value)),
    stop: () => dispatch(playerStop()),
    toggle: () => dispatch(playerToggle()),
    next: (song) => dispatch(playerNext(song)),
    previous: (song) => dispatch(playerPrevious(song)),
  },
  updateEffect: (key, value) => dispatch(updateEffect(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps, false, { pure: true })(Main);
