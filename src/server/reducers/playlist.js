import { Map, List, fromJS } from 'immutable';
import { MPD_PLCHANGES, MPD_PLCHANGESPOSID } from '../actions/commands';
import { Playlist } from '../../model/records';
import { constructSongList } from '../../model/constructors';

const initialState = new Playlist();
const mergeSongs = (songs, plchanges) => songs
  .groupBy((song) => song.pos)
    .mergeWith((prev, next) => next, plchanges.groupBy((song) => song.pos))
    .toList().map((v) => v.get(0))
  .sort((songA, songB) => songA.pos - songB.pos);
const moveSongs = (songs, plchangesposid) => songs
  .withMutations((_songs) => {
    const cIds = plchangesposid.map((plchange) => parseInt(plchange.id, 10));
    const cPos = plchangesposid.map((plchange) => parseInt(plchange.cpos, 10));
    const cSongs = _songs.filter((song) => cIds.indexOf(song.id) > -1);
    cSongs.forEach((song) => {
      const n = cIds.indexOf(song.id);
      _songs.set(cPos[n], song.set('pos', cPos[n]));
    });
  })
  .sort((songA, songB) => songA.pos - songB.pos);
export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case MPD_PLCHANGESPOSID:
        if (payload.changes.length || Object.keys(payload.changes).length > 0) {
          prevState
            .update('songs', (songs) => moveSongs(songs, payload.changes))
            .set('lastChangeposid', payload.changes);
        }
        else {
          prevState.set('lastChange', new List());
        }
        if (prevState.length > payload.length) {
          prevState.update('songs', (songs) => songs.slice(0, payload.length));
        }
        prevState
          .set('head', payload.head)
          .set('length', payload.length)
          .set('lastChange', new List());

        break;
      case MPD_PLCHANGES:
        if (prevState.length > payload.length) {
          prevState.update('songs', (songs) => songs.slice(0, payload.length));
        }
        if (payload.changes.length || Object.keys(payload.changes).length > 0) {
          const plchanges = constructSongList(payload.changes);
          prevState
            .set('songs', mergeSongs(prevState.songs, plchanges))
            .set('lastChange', plchanges);
        }
        else {
          prevState.set('lastChange', new List());
        }
        prevState
          .set('head', payload.head)
          .set('length', payload.length)
          .set('lastChangeposid', []);
        break;
      default:
    }
  });
