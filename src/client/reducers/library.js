import { Map, List, fromJS } from 'immutable';
import { Library, createAlbumCollection, createSongCollection } from 'mpd-middleware/core';
import { LOAD_ARTISTS, LOAD_ALBUMS, LOAD_SONGS } from '../actions/library';

const initialState = new Library();

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case LOAD_ARTISTS:
        prevState.set('artists', new List(payload.artists));
        break;
      case LOAD_ALBUMS:
        prevState.set('albums', createAlbumCollection(payload.albums));
        break;
      case LOAD_SONGS:
        prevState.set('songs', payload.songs);
        break;
      default:
    }
  });
