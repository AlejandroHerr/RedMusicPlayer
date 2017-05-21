import { parseObject, parseArray, parseArrayObject } from 'mpd-middleware/utils';

export const MPD_ERROR = 'MPD_ERROR';
export const MPD_LIST_ARTISTS = 'MPD_LIST_ARTISTS';
export const MPD_LIST_ALBUMS = 'MPD_LIST_ALBUMS';
export const MPD_FIND_SONGS = 'MPD_FIND_SONGS';
export const MPD_PLCHANGE = 'MPD_PLCHANGE';
export const MPD_PLADDED = 'MPD_PLADDED';
export const MPD_STATUS = 'MPD_STATUS';

const actionBuilder = (type, payload) => ({ type, payload });
const mpdCbBuilder = (type, formatter = (res) => res) =>
  (dispatch) =>
    (err, res) => {
      if (err) {
        dispatch({ type: MPD_ERROR, payload: { err } });
        return;
      }
      dispatch({ type, payload: formatter(res) });
    };



export const mpdPlchange = mpdCbBuilder(MPD_PLCHANGE, (res) => ({ songs: parseArrayObject(res) }));
export const mpdStatus = mpdCbBuilder(MPD_STATUS, (res) => ({ status: parseObject(res) }));
