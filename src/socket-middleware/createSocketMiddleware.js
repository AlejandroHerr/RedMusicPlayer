import { isRSSA, SOCKET_CLIENT, SOCKET_EVENT, SOCKET_EVENT_EMITTED } from './core';

export default (socket, eventName = SOCKET_EVENT) => ({ dispatch }) => {
  socket.on(eventName, dispatch);

  return (next) => (action) => {
    if (!isRSSA(action)) {
      return next(action);
    }

    const { event, eventAction, nextAction } = action[SOCKET_CLIENT];
    socket.emit(event, eventAction);

    //return null;
    if (nextAction === null || nextAction.length === 0) {
      return null;
    }

    return next(nextAction);
  };
};
