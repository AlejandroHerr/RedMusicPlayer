export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const CLIENT_CONNECT = 'CLIENT_CONNECT';
export const CLIENT_DISCONNECT = 'CLIENT_DISCONNECT';

export const connectClient = (client) => ({ type: CLIENT_CONNECT, payload: { client } });
export const disconnectClient = (client) => ({ type: CLIENT_DISCONNECT, payload: { client } });

export const UPDATE_LIBRARY = 'UPDATE_LIBRARY';
