import shallowEqual from 'fbjs/lib/shallowEqual';
import { mpdListArtists, mpdListAlbumsByArtists, mpdFindSongsByAlbum, mpdPlchanges } from '../actions/mpd';
import { observeStore } from 'server-redux';

export const createArtistsCollectionObserver = (store, uuid) => observeStore(
  store,
  ({ library: state }) => ({ artist: state.getIn([uuid, 'artists', state.getIn([uuid, 'scope', 'artist'])]) }),
  (dispatch, s) => dispatch(mpdListAlbumsByArtists(uuid, s.artist)),
  shallowEqual
);

export const createAlbumsCollectionObserver = (store, uuid) => observeStore(
  store,
  ({ library: state }) => ({
    album: state.getIn([uuid, 'albums', state.getIn([uuid, 'scope', 'album']), 'title']),
    artist: state.getIn([uuid, 'artists', state.getIn([uuid, 'scope', 'artist'])]),
  }),
  (dispatch, s) => dispatch(mpdFindSongsByAlbum(uuid, s.artist, s.album)),
  (s1, s2) => s1.album === s2.album
);

export const playlistObserver = (store) => observeStore(
  store,
  ({ playlist: state }) => ({ id: state.getIn(['status', 'playlist']) }),
  (dispatch, s) => dispatch(mpdPlchanges(s.id)),
  shallowEqual
);
