import { SOCKET_CLIENT } from 'socket-middleware/core';
import { SOCKET_FETCH_LIBRARY } from 'actions/socket';

export const socketFetchLibrary = () => ({
  [SOCKET_CLIENT]: {
    event: SOCKET_FETCH_LIBRARY,
  },
});
