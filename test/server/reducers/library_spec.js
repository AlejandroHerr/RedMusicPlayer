/* global describe, it */
/* eslint no-undefined: 0 */
import { expect } from 'chai';
import { List } from 'immutable';
import { Library, ClientLibrary } from '../../../src/model/records';
import {
  CLIENT_CONNECT,
  CLIENT_DISCONNECT,
  CLIENT_LIBRARY_CHANGE_ARTIST,
  CLIENT_LIBRARY_UPDATE_SONGS,
} from '../../../src/server/actions/socket';
import reducer from '../../../src/server/reducers/library';

describe('status reducer', () => {
  let state;
  it('should return the initial state', () => {
    state = reducer(state, { type: '@@redux/INIT' });
    expect(state).to.equal(new Library());
    expect(state.clients).to.have.size(0);
  });
  const clientOne = 'client_one';
  const clientTwo = 'client_two';
  it('should handle CLIENT_CONNECT action', () => {
    let action = {
      type: CLIENT_CONNECT,
      payload: { client: clientOne },
    };
    state = reducer(state, action);

    expect(state.clients).to.have.size(1);
    expect(state.clients).to.have.property(clientOne);
    expect(state.clients).to.have.property(clientOne, new ClientLibrary());
    action = {
      type: CLIENT_CONNECT,
      payload: { client: clientOne },
    };
    state = reducer(state, action);

    expect(state.clients).to.have.size(2);
    expect(state.clients).to.have.property(clientTwo);
    expect(state.clients).to.have.property(clientTwo, new ClientLibrary());
  });
  it('should handle CLIENT_LIBRARY_CHANGE_ARTIST action', () => {
    const action = {
      type: CLIENT_LIBRARY_CHANGE_ARTIST,
      payload: {
        client: clientOne,
        artists: 23,
      },
    };
    state = reducer(state, action);
    expect(state.clients.get(clientOne).artist).to.have.property('artist', 23);
  });
  it('should handle CLIENT_LIBRARY_UPDATE_SONGS action', () => {
    const songs = List.of(['song1', 'song2', 'song3']);
    const action = {
      type: CLIENT_LIBRARY_UPDATE_SONGS,
      payload: {
        client: clientOne,
        songs,
      },
    };
    state = reducer(state, action);
    expect(state.clients.get(clientOne).artist).to.have.property('songs', songs);
  });
  it('should handle CLIENT_DISCONNECT', () => {
    let action = {
      type: CLIENT_DISCONNECT,
      payload: { client: clientOne },
    };
    state = reducer(state, action);

    expect(state.clients).to.have.size(1);
    expect(state.clients).to.not.have.property(clientTwo);
    expect(state.clients).to.have.property(clientOne);
    expect(state.clients).to.have.property(clientTwo, new ClientLibrary());
    action = {
      type: CLIENT_DISCONNECT,
      payload: { client: clientTwo },
    };
    state = reducer(state, action);

    expect(state.clients).to.have.size(0);
    expect(state.clients).to.not.have.property(clientTwo);
  });
});
