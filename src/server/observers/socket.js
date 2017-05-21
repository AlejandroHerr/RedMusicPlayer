import shallowEqual from 'fbjs/lib/shallowEqual';
import { SOCKET_EVENT } from 'socket-middleware/core';
import { observeStore } from 'server-redux';
import { updateStatus, updatePlaylist } from 'client/actions';

const plObserverSelector = ({ playlist }) => playlist;

const plObserverHandler = (socket) => (dispatch, state) => socket.emit(SOCKET_EVENT, updatePlaylist(state));

export const startPlObserver = (store, socket) =>
  observeStore(store, plObserverSelector, plObserverHandler(socket), shallowEqual);

const statusObserverSelector = ({ status }) => status;

const statusObserverHandler = (socket) => (dispatch, state) => socket.emit(SOCKET_EVENT, updateStatus(state));

export const startStatusObserver = (store, socket) =>
  observeStore(store, statusObserverSelector, statusObserverHandler(socket), shallowEqual);
