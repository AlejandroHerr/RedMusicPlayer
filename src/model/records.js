/* global Symbol */
import { Record, Map, List, fromJS } from 'immutable';

export const Playlist = new Record({
  head: 0,
  songs: new List(),
  lastChange: new List(),
  lastChangeposid: [],
  length: 0,
}, 'Playlist');

export const Status = new Record({
  volume: -1,
  repeat: false,
  random: false,
  single: false,
  consume: false,
  playlist: 0,
  playlistlength: 0,
  mixrampdb: -1,
  state: 'stop',
  song: -1,
  songid: -1,
  time: 0,
  elapsed: 0,
  bitrate: '',
  audio: -1,
  nextsong: -1,
  nextsongid: -1,
});

export const Song = new Record({
  'file': '/',
  'lastModified': '',
  'time': 0,
  'title': '',
  'artist': '',
  'albumArtist': '',
  'album': '',
  'disc': 1,
  'date': 1900,
  'track': 1,
  'genre': '',
  'pos': -1,
  'id': -1,
}, 'Song');

export const Disc = new Record({
  number: 1,
  songs: List.of(),
}, 'Disc');

export const Album = new Record({
  date: 1900,
  discs: List.of(),
  title: '',
}, 'Album');

export const LibraryScope = new Record({
  artist: 0,
  album: 0,
});

export const Library = new Record({
  artists: List.of(),
  albums: List.of(),
  songs: List.of(),
  scope: new LibraryScope(),
});

export const AppStatus = new Record({
  error: '',
  status: new Status(),
});
