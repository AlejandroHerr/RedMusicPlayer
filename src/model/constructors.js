/* global Symbol */
import { Record, Map, List, fromJS } from 'immutable';

import { Status, Song, Disc, Album } from './records';

export const constructStatus = (status = {}) => {
  if (status.time && typeof status.time === 'string') {
    const time = status.time.match(/([0-9]+):([0-9]+)/);
    if (time) {
      status.time = parseInt(time[2], 10);
      status.elapsed = parseInt(time[1], 10);
    }
  }
  status.playlist = parseInt(status.playlist, 10);
  status.playlistlength = parseInt(status.playlistlength, 10);
  status.random = status.random === true || status.random === '1';
  status.repeat = status.repeat === true || status.repeat === '1';
  status.single = status.single === true || status.single === '1';
  status.consume = status.consue === true || status.consue === '1';
  if (status.volume) { status.volume = parseInt(status.volume, 10); }
  if (status.song) { status.song = parseInt(status.song, 10); }
  if (status.songid) { status.songid = parseInt(status.songid, 10); }
  if (status.nextsong) { status.nextsong = parseInt(status.nextsong, 10); }
  if (status.nextsongid) { status.nextsongid = parseInt(status.nextsongid, 10); }

  return new Status(status);
};

export const constructSong = (song = {}) => {
  const _song = Object.assign({}, song);
  if (song.id) { _song.id = parseInt(song.id, 10); }
  if (song.pos) { _song.pos = parseInt(song.pos, 10); }
  if (song.disc) { _song.disc = parseInt(song.disc, 10); }
  if (song.date) { _song.date = parseInt(song.date, 10); }
  if (song.track) { _song.track = parseInt(song.track, 10); }

  return new Song(_song);
};

export const constructSongList = (songs = []) => {
  let _songs = songs;
  if (!Array.isArray(songs)) {
    _songs = [songs];
  }

  return new List(_songs).map(constructSong);
};

const constructAlbum = (tracks = new List(), title = '') => new Album({
  date: tracks.get(0).date,
  discs: tracks
    .groupBy((song) => song.get('disc'))
      .map((songs, number) => new Disc({
        number,
        songs: songs.sortBy((song) => song.track),
      }))
    .sortBy((disc) => disc.number)
    .toList(),
  title,
});

export const constructAlbumList = (songs = []) => {
  let tracks;
  if (List.isList(songs)) {
    tracks = songs;
  }
  else {
    tracks = constructSongList(songs);
  }

  return tracks
    .groupBy((song) => song.album)
      .map(constructAlbum)
    .sortBy((album) => album.date)
    .toList();
};
