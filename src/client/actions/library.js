export const LOAD_ARTISTS = 'LOAD_ARTISTS';

export const loadArtists = (artists) => ({
  type: LOAD_ARTISTS,
  payload: { artists },
});

export const LOAD_ALBUMS = 'LOAD_ALBUMS';

export const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  payload: { albums },
});

export const LOAD_SONGS = 'LOAD_SONGS';

export const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  payload: { songs },
});
