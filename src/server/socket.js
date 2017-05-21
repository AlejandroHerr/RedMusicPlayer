import socketio from 'socket.io';
import { generate } from 'randomstring';
import { SOCKET_EVENT } from 'socket-middleware/core';
import { startPlObserver, startStatusObserver } from './observers/socket';
import { connectClient, disconnectClient } from './actions';

import {
  mpdStatusCmd,
  mpdPause,
  mpdStop,
  mpdSeekcur,
  mpdNext,
  mpdPrevious,
  mpdPlay,
  mpdUpdatePaybackCmd,
  mpdSetvolCmd,
  mpdList,
  mpdFind,
} from './actions/mpdCommands';
import {
  MPD_STATUS,
  MPD_PLAY,
  MPD_STOP,
  MPD_TOGGLE_PAUSE,
  MPD_SEEK,
  MPD_PREVIOUS,
  MPD_NEXT,
  MPD_UPDATE_PLAYBACK,
  MPD_SETVOL,
} from './socket/events';

export const startSocket = (server, store) => {
  const io = socketio(server);
  const { dispatch, getState } = store;

  startPlObserver(store, io);
  startStatusObserver(store, io);

  io.on('connection', (socket) => {
    const client = generate(20);
    dispatch(connectClient(client));
    socket.on('disconnect', () => dispatch(disconnectClient(client)));

    // cambiar por emitir el status
    dispatch(mpdStatusCmd());
    socket.emit(SOCKET_EVENT, {
      type: 'UPDATE_PLAYLIST',
      payload: {
        songs: getState().playlist.songs,
        length: getState().playlist.length,
        head: getState().playlist.head,
      },
    });
    //dispatch(mpdList(client, 'albumartist'));
    //dispatch(mpdFind(client, 'album', [['albumartist','Woods']], ['date']));
    dispatch(mpdFind(client, [['albumartist','The Who']]));
    //dispatch(mpdList('ass','album'));
    socket.on(MPD_STATUS, () => dispatch(mpdStatusCmd()));
    socket.on(MPD_PLAY, (position) => dispatch(mpdPlay(position)));
    socket.on(MPD_STOP, () => dispatch(mpdStop()));
    socket.on(MPD_SEEK, (elapsed) => dispatch(mpdSeekcur(elapsed)));
    socket.on(MPD_TOGGLE_PAUSE, () => dispatch(mpdPause(getState().status.state === 'play' ? 1 : 0)));
    socket.on(MPD_NEXT, () => dispatch(mpdNext()));
    socket.on(MPD_PREVIOUS, () => dispatch(mpdPrevious()));
    socket.on(MPD_UPDATE_PLAYBACK, (change) => dispatch(mpdUpdatePaybackCmd(change.key, change.value)));
    socket.on(MPD_SETVOL, (value) => {
      const volume = value < 0 ? 0 : value > 100 ? 100 : value;
      dispatch(mpdSetvolCmd(volume));
    });
  });

  return io;
};
