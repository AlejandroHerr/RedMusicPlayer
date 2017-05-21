/* global describe, it */
import { expect } from 'chai';
import {
  CLIENT_CONNECT,
  CLIENT_DISCONNECT,
  CLIENT_LIBRARY_CHANGE_ARTIST,
  CLIENT_LIBRARY_UPDATE_SONGS,
  connectClient,
  disconnectClient,
  changeArtist,
  updateSongs,
} from '../../../src/server/actions/socket';

describe('status reducer', () => {
  it('connectClient should return a CLIENT_CONNECT-type action', () => {
    const action = {
      type: CLIENT_CONNECT,
      payload: { client: 'client_one' },
    };
    expect(connectClient('client_one')).to.deep.equal(action);
  });
  it('connectClient should return a CLIENT_DISCONNECT-type action', () => {
    const action = {
      type: CLIENT_DISCONNECT,
      payload: { client: 'client_one' },
    };
    expect(disconnectClient('client_one')).to.deep.equal(action);
  });
  it('connectClient should return a CLIENT_LIBRARY_CHANGE_ARTIST-type action', () => {
    const action = {
      type: CLIENT_LIBRARY_CHANGE_ARTIST,
      payload: { artist: 5 },
    };
    expect(changeArtist('client_one')).to.deep.equal(action);
  });
  it('connectClient should return a CLIENT_LIBRARY_CHANGE_ARTIST-type action', () => {
    const action = {
      type: CLIENT_LIBRARY_UPDATE_SONGS,
      payload: { songs: ['song1'] },
    };
    expect(updateSongs('client_one')).to.deep.equal(action);
  });
});
