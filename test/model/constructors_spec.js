/* global describe, it */
import { expect } from 'chai';
import { is, List } from 'immutable';
import { Song, Album } from '../../src/model/records';
import { constructSong, constructSongList, constructAlbumList } from '../../src/model/constructors';

describe('model constructors', () => {
  const stubSong = {
    id: '23',
    pos: '23',
    disc: '23',
    date: '23',
    track: '23',
  };
  describe('constructSong', () => {
    it('should create a record with default values', () => {
      const emptySong = constructSong({});
      const noSong = constructSong();

      expect(is(emptySong, new Song())).to.equal(true);
      expect(is(noSong, new Song())).to.equal(true);
    });
    it('should create a record song with integer', () => {
      const song = constructSong(stubSong);

      expect(song.id).to.equal(23);
      expect(song.id).to.not.equal('23');
      expect(song.pos).to.equal(23);
      expect(song.pos).to.not.equal('23');
      expect(song.track).to.equal(23);
      expect(song.track).to.not.equal('23');
      expect(song.disc).to.equal(23);
      expect(song.disc).to.not.equal('23');
      expect(song.date).to.equal(23);
      expect(song.date).to.not.equal('23');
    });

  });
  describe('constructSongList', () => {
    it('should create an empty List', () => {
      const songList = constructSongList();

      expect(List.isList(songList)).to.equal(true);
      expect(songList.size).to.equal(0);
    });
    it('should create a List of Songs', () => {
      const songList = constructSongList([stubSong, stubSong, stubSong]);

      expect(songList.get(0)._name).to.equal('Song');
      expect(songList.size).to.equal(3);
    });
  });
  describe('constructAlbum', () => {
    const createStubAlbum = (album = 'Album', date = 1988, discs = 1, songs = [10]) => {
      const tracks = [];

      for (let d = 0; d < discs; d = d + 1) {
        const _disc = discs - d;
        const _songs = songs[_disc - 1];
        for (let s = 0; s < _songs; s = s + 1) {
          const _song = _songs - s;
          tracks.push({
            album,
            title: `${album}_${_disc}_${_song}`,
            disc: _disc,
            track: _songs - s,
            date,
          });
        }
      }
      return tracks;
    };
    it('should create an empty list of Albums', () => {
      const emptyAlbums = constructAlbumList([]);
      const noAlbums = constructAlbumList();

      expect(List.isList(emptyAlbums)).to.equal(true);
      expect(List.isList(noAlbums)).to.equal(true);
      expect(emptyAlbums.size).to.equal(0);
      expect(noAlbums.size).to.equal(0);
    });
    it('should create a list of Albums', () => {
      const tracks1 = createStubAlbum('The Album', 2016);
      const tracks2 = createStubAlbum('The Second Album', 1988, 2, [12, 15]);
      const tracks = [];
      tracks.push(...tracks1, ...tracks2);
      const albums = constructAlbumList(tracks);
      //const album1
      //console.log(albums);
      expect(List.isList(albums)).to.equal(true);
      expect(albums.size).to.equal(2);

    });
  });
});

