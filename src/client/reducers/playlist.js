import { Map, List, fromJS } from 'immutable';
import { UPDATE_PLAYLIST } from '../actions';
import { Playlist, createSongCollection } from 'mpd/core';

const initialState = new Playlist();

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_PLAYLIST:
        const { head, length, songs } = payload;
        if (length < prevState.length) {
          prevState.update('songs', (prevSongs) => prevSongs.slice(0, length));
        }
        if (songs.length !== 0 && songs[0].hasOwnProperty('pos')) {
          const newSongs = createSongCollection(songs);
          prevState
            .update('songs', (prevSongs) => prevSongs
              .groupBy((song) => song.pos)
              .mergeWith((prev, next) => next, newSongs.groupBy((song) => song.pos))
              .toList().map((v) => v.get(0))
              .sort((songA, songB) => songA.pos - songB.pos));
        }

        prevState.set('head', head);
        prevState.set('length', length);

        break;
      default:
    }
  });
