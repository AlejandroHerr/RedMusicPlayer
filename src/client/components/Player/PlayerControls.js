import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import { Song } from 'mpd/core';
import Component from '../PureComponent';
import PlayerControl from './Controls/PlayerControl';
import PlaybackControl from './Controls/PlaybackControl';
import VolumeControl from './Controls/VolumeControl';

export default class PlayerControls extends Component {
  render() {
    const {
      actions: { change, changePlayback, next, play, previous, setvol, stop, toggle },
      nextSong,
      playlistLength,
      position,
      previousSong,
      showVolume,
      status: { state, random, repeat, single, volume },
      updateEffect,
    } = this.props;

    //console.log(position + 1 === playlistLength , !random,position + 1 === playlistLength && !random);
    return (
      <ul className='player-controls'>
        <PlayerControl
          classname={'player-prev'}
          disabled={position === 0}
          fixedWidth
          icon='step-backward'
          onClick={state === 'stop' ? () => change(previousSong) : () => previous(previousSong)} />
        <PlayerControl
          classname={'player-play'}
          fixedWidth
          icon={classNames({ 'play-circle': state !== 'play', 'pause-circle': state === 'play' })}
          onClick={state === 'stop' ? () => play(position) : toggle} />
        <PlayerControl
          classname={'player-stop'}
          disabled={state === 'stop'}
          fixedWidth
          icon='stop-circle'
          onClick={stop} />
        <PlayerControl
          classname={'player-next'}
          disabled={position + 1 === playlistLength && !random}
          fixedWidth
          icon='step-forward'
          onClick={state === 'stop' ? () => change(nextSong) : () => next(nextSong)} />
        <PlaybackControl
          classnames={['playback-control', 'player-random']}
          disabled={!random}
          letter='z'
          onClick={() => changePlayback('random', !random)} />
        <PlaybackControl
          classnames={['playback-control', 'player-repeat']}
          disabled={!repeat}
          letter='r'
          onClick={() => changePlayback('repeat', !repeat)} />
        <PlaybackControl
          classnames={['playback-control', 'player-single']}
          disabled={!single}
          letter='s'
          onClick={() => changePlayback('single', !single)} />
        <VolumeControl
          onClick={setvol}
          show={showVolume}
          updateEffect={updateEffect}
          volume={volume} />
      </ul>
    );
  }
}

PlayerControls.defaultProps = {
  nextSong: new Song(),
  previousSong: new Song(),
};

PlayerControls.propTypes = {
  actions: React.PropTypes.shape({
    change: React.PropTypes.func.isRequired,
    changePlayback: React.PropTypes.func.isRequired,
    next: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    previous: React.PropTypes.func.isRequired,
    setvol: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    toggle: React.PropTypes.func.isRequired,
  }),
  nextSong: ImmutablePropTypes.record.isRequired,
  playlistLength: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  previousSong: ImmutablePropTypes.record.isRequired,
  status: ImmutablePropTypes.record.isRequired,
  updateEffect: React.PropTypes.func.isRequired,
};

/**/