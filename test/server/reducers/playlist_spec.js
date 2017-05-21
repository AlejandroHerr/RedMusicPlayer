/* global describe, it */
/* eslint no-undefined: 0 */
import { expect } from 'chai';
import { List } from 'immutable';
import { parseResponse } from '../../../src/mpdMiddleware/utils';
import { MPD_PLCHANGES, MPD_PLCHANGESPOSID } from '../../../src/server/actions/commands';
import reducer from '../../../src/server/reducers/playlist';
import { constructSongList } from '../../../src/model/constructors';
import { Playlist } from '../../../src/model/records';
import {
  plchangesInitial,
  plchangesAddFirst,
  plchangesRemoveFirst,
  plchangesAddEnd,
  plchangesposid,
  plchangesposidRemove } from '../../mpd/mock/mpd_response_mock';

describe('playlist reducer', () => {
  let prevState = new Playlist();
  const initialSongs = constructSongList(parseResponse(plchangesInitial));
  it('should return the initial state', () => {
    const nextState = reducer(undefined, { type: '@@redux/INIT' });
    expect(nextState).to.equal(prevState);
  });
  it('should handle MPD_PLCHANGES with initial playlist', () => {
    const response = parseResponse(plchangesInitial);
    const songs = constructSongList(response);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGES,
      payload: { head: 0, length: 10, changes: response },
    });
    expect(nextState.songs).to.equal(songs);
    expect(nextState.lastChange).to.equal(songs);
    expect(nextState.head).to.equal(0);
    expect(nextState.length).to.equal(10);
    expect(nextState.songs.count()).to.equal(10);
    expect(nextState.lastChangeposid).to.be.a('array');
    expect(nextState.lastChangeposid).to.be.empty;
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGES with song added at the begining', () => {
    const response = parseResponse(plchangesAddFirst);
    const songs = constructSongList(response);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGES,
      payload: { head: 1, length: 11, changes: response },
    });

    expect(nextState.songs).to.equal(songs);
    expect(nextState.lastChange).to.equal(songs);
    expect(nextState.head).to.equal(1);
    expect(nextState.length).to.equal(11);
    expect(nextState.songs.count()).to.equal(11);
    expect(nextState.lastChangeposid).to.be.a('array');
    expect(nextState.lastChangeposid).to.be.empty;
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGES with song removed at the begining', () => {
    const response = parseResponse(plchangesRemoveFirst);
    const songs = constructSongList(response);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGES,
      payload: { head: 2, length: 10, changes: response },
    });

    expect(nextState.songs).to.equal(initialSongs);
    expect(nextState.songs).to.equal(songs);
    expect(nextState.lastChange).to.equal(songs);
    expect(nextState.head).to.equal(2);
    expect(nextState.length).to.equal(10);
    expect(nextState.songs.count()).to.equal(10);
    expect(nextState.lastChangeposid).to.be.a('array');
    expect(nextState.lastChangeposid).to.be.empty;
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGES with song added at the end', () => {
    const response = parseResponse(plchangesAddEnd);
    const songs = constructSongList(response);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGES,
      payload: { head: 3, length: 11, changes: response },
    });

    expect(nextState.songs.last()).to.equal(songs.get(0));
    expect(nextState.lastChange).to.equal(songs);
    initialSongs.forEach((song, idx) => {
      expect(nextState.songs.get(idx)).to.equal(song);
    });
    expect(nextState.head).to.equal(3);
    expect(nextState.length).to.equal(11);
    expect(nextState.songs.count()).to.equal(11);
    expect(nextState.lastChangeposid).to.be.a('array');
    expect(nextState.lastChangeposid).to.be.empty;
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGES with song removed at the end', () => {
    const response = parseResponse('');
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGESPOSID,
      payload: { head: 4, length: 10, changes: response },
    });

    expect(nextState.songs).to.equal(initialSongs);
    expect(nextState.lastChange).to.equal(new List());
    expect(nextState.head).to.equal(4);
    expect(nextState.length).to.equal(10);
    expect(nextState.songs.count()).to.equal(10);
    expect(nextState.lastChangeposid).to.be.a('array');
    expect(nextState.lastChangeposid).to.be.empty;
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGESPOSID with song changed', () => {
    const response = parseResponse(plchangesposid);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGESPOSID,
      payload: { head: 5, length: 10, changes: response },
    });

    expect(nextState.songs.get(9).id).to.equal(prevState.songs.get(8).id);
    expect(nextState.songs.get(8).id).to.equal(prevState.songs.get(9).id);
    expect(nextState.lastChangeposid).to.equal(response);
    expect(nextState.head).to.equal(5);
    expect(nextState.length).to.equal(10);
    expect(nextState.lastChange).to.equal(new List());
    prevState = nextState;
  });
  it('should handle MPD_PLCHANGESPOSID with song removed', () => {
    const response = parseResponse(plchangesposidRemove);
    const nextState = reducer(prevState, {
      type: MPD_PLCHANGESPOSID,
      payload: { head: 6, length: 9, changes: response },
    });
    expect(nextState.songs.get(0).id).to.equal(prevState.songs.get(0).id);
    expect(nextState.songs.get(1).id).to.equal(prevState.songs.get(1).id);
    expect(nextState.songs.get(2).id).to.equal(prevState.songs.get(2).id);
    expect(nextState.songs.get(3).id).to.equal(prevState.songs.get(4).id);
    expect(nextState.songs.get(4).id).to.equal(prevState.songs.get(5).id);
    expect(nextState.songs.get(5).id).to.equal(prevState.songs.get(6).id);
    expect(nextState.songs.get(6).id).to.equal(prevState.songs.get(7).id);
    expect(nextState.songs.get(7).id).to.equal(prevState.songs.get(8).id);
    expect(nextState.songs.get(8).id).to.equal(prevState.songs.get(9).id);
    expect(nextState.lastChangeposid).to.equal(response);
    expect(nextState.head).to.equal(6);
    expect(nextState.length).to.equal(9);
    expect(nextState.songs.count()).to.equal(9);
    expect(nextState.lastChange).to.equal(new List());
    prevState = nextState;
  });
});
