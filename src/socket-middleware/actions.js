export const MPD_CLIENT = Symbol('MPD_HOST');
SOCKET_EVENT_EMITTED
export const MPD_PREFIX = 'MPD_HOST';

export const MPD_FETCH_ARTISTS = `${MPD_PREFIX}_FETCH_ARRTIST`;

export const mpdFetchArtists = {
  type: MPD_FETCH_ARTISTS,
  mpdAction: {
    cmd: ['list', ['albumartist']],
    cb: (err, msg) => console.log('as',err,msg),
  },
};
