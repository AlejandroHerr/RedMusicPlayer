import { Record, Map, List, fromJS } from 'immutable';
import { createStatus, Status } from 'mpd/core';
import { UPDATE_STATUS, START_TIMER, KILL_TIMER, TICK_TIMER, UPDATE_SEEK, UPDATE_SONG, PLAYER_TOGGLE, PLAYER_PLAY, PLAYER_STOP, UPDATE_PLAYBACK } from '../actions';

const Timer = new Record({
  start: 0,
  ticks: 0,
});
const initialState = new Map({
  status: new Status(),
  timer: new Timer(),
});

/** MOVE SOMEWHERE */
const changeSong = (status, song) => status
  .withMutations((s) => {
    s.set('song', song.pos)
      .set('songid', song.id)
      .set('time', song.time)
      .set('elapsed', 0);
  });

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_STATUS:
        prevState.set('status', createStatus(payload.status));
        break;
      case UPDATE_PLAYBACK:
        prevState.setIn(['status', payload.key], payload.value);
        break;
      case KILL_TIMER:
        prevState.set('timer', new Timer());
        break;
      case START_TIMER:
        prevState.set('timer', new Timer(payload));
        break;
      case TICK_TIMER:
        console.log(prevState.getIn(['timer', 'ticks']));
        prevState.updateIn(['timer', 'ticks'], (ticks) => (ticks + 1) % 5);
        break;
      case PLAYER_PLAY:
        prevState
          .setIn(['status', 'state'], 'play')
          .setIn(['status', 'elapsed'], 0);
        break;
      case PLAYER_STOP:
        prevState
          .setIn(['status', 'state'], 'stop')
          .setIn(['status', 'elapsed'], 0);
        break;
      case PLAYER_TOGGLE:
        prevState.update('status', (status) => status
          .withMutations((s) => {
            if (s.state === 'play') {
              s.set('state', 'pause')
                .update('elapsed', (e) => e + (payload.time - prevState.getIn(['timer', 'start'])) / 1000);
            }
            else {
              s.set('state', 'play');
            }
          })
        );
        break;
      case UPDATE_SEEK:
        prevState.setIn(['status', 'elapsed'], payload.elapsed);
        break;
      case UPDATE_SONG:
        prevState.update('status', (status) => changeSong(status, payload.song));
        break;
      default:
    }
  });
