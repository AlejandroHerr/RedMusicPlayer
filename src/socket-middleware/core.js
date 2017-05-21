/* global Symbol */
export const SOCKET_CLIENT = Symbol('SOCKET_CLIENT');
export const SOCKET_EVENT = 'SOCKET_EVENT';
export const SOCKET_EVENT_EMITTED = 'SOCKET_EVENT_EMITTED';

export const createSocketAction = (event, eventAction = {}, nextAction = null) => ({
  [SOCKET_CLIENT]: {
    event,
    eventAction,
    nextAction,
  },
});

export const isRSSA = (action) => action.hasOwnProperty(SOCKET_CLIENT);
