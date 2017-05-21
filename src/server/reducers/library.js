import { Map, List, fromJS } from 'immutable';
import { Library, createSongCollection, constructAlbumList } from 'mpd/core';
import { CLIENT_CONNECT, CLIENT_DISCONNECT, UPDATE_LIBRARY } from '../actions';
//import { MPD_LIST_ARTISTS, MPD_LIST_ALBUMS, MPD_FIND_SONGS } from '../actions/mpd';

const initialState = new Map();

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case CLIENT_CONNECT:
        prevState.set(payload.client, new Library());
        break;
      case CLIENT_DISCONNECT:
        prevState.delete(payload.client);
        break;
      case UPDATE_LIBRARY:
        console.log(constructAlbumList(payload.songs));
        //console.log(type, payload);
      /*case MPD_LIST_ARTISTS:
        prevState.setIn([payload.client, 'artists'], payload.artists);
        break;
      case MPD_LIST_ALBUMS:
        prevState.setIn([payload.client, 'albums'], payload.albums);
        break;
      case MPD_FIND_SONGS:
        prevState.setIn([payload.client, 'songs'], payload.songs);*/
        break;
      default:
    }
  });
