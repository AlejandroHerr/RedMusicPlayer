import { createSocketAction } from 'socket-middleware/core';
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
} from 'server/socket/events';

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const updateStatus = (status) => ({
  type: UPDATE_STATUS,
  payload: {
    status,
  },
});

export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  payload: {
    songs: playlist.songs,
    length: playlist.length,
    head: playlist.head,
  },
});

export const START_TIMER = 'START_TIMER';
export const KILL_TIMER = 'KILL_TIMER';
export const TICK_TIMER = 'TICK_TIMER';
export const startTimer = (start) => ({
  type: START_TIMER,
  payload: {
    start,
  },
});
export const killTimer = () => ({
  type: KILL_TIMER,
});
export const tickTimer = () => ({
  type: TICK_TIMER,
});

export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_STOP = 'PLAYER_STOP';
export const PLAYER_TOGGLE = 'PLAYER_TOGGLE';
export const UPDATE_SEEK = 'UPDATE_SEEK';
export const UPDATE_SONG = 'UPDATE_SONG';
export const UPDATE_PLAYBACK = 'UPDATE_PLAYBACK';

const toggle = (time = Date.now()) => ({ type: PLAYER_TOGGLE, payload: { time } });
const updateSeek = (elapsed) => ({ type: UPDATE_SEEK, payload: { elapsed } });
const updateSong = (song) => ({ type: UPDATE_SONG, payload: { song } });
const updatePlayback = (key, value) => ({
  type: UPDATE_PLAYBACK,
  payload: { key, value },
});

export const playerStatus = () => createSocketAction(MPD_STATUS);
export const playerPlay = (position) => createSocketAction(MPD_PLAY, position, { type: PLAYER_PLAY });
export const playerStop = () => createSocketAction(MPD_STOP, null, { type: PLAYER_STOP });
export const playerToggle = () => createSocketAction(MPD_TOGGLE_PAUSE, null, toggle());
export const playerSeek = (elapsed) => createSocketAction(MPD_SEEK, elapsed, updateSeek(elapsed));
export const playerNext = (song) => createSocketAction(MPD_NEXT, null, updateSong(song));
export const playerPrevious = (song) => createSocketAction(MPD_PREVIOUS, null, updateSong(song));
export const playerChange = (song) => updateSong(song);
export const playerChangePlayback = (key, value) =>
  createSocketAction(MPD_UPDATE_PLAYBACK, { key, value }, updatePlayback(key, value));
export const playerSetvol = (value) =>
  createSocketAction(MPD_SETVOL, value, updatePlayback('volume', value));

export const UPDATE_EFFECT = 'UPDATE_EFFECT';

export const updateEffect = (key, value) => ({
  type: UPDATE_EFFECT,
  payload: { key, value },
});
