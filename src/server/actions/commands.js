import { createMPDSA } from '../../mpdMiddleware/createMPDSA';

const playlistPayload = (head, length) => (err, res) => ({ head, length, changes: res });
export const MPD_STATUS = 'MPD_STATUS';
export const MPD_STATS = 'MPD_STATS';
export const MPD_PLCHANGES = 'MPD_PLCHANGES';
export const mpdPlchangesType = (head, length) => ({
  type: MPD_PLCHANGES,
  payload: playlistPayload(head, length),
});
export const MPD_PLCHANGESPOSID = 'MPD_PLCHANGESPOSID';
export const mpdPlchangesposidType = (head, length) => ({
  type: MPD_PLCHANGESPOSID,
  payload: playlistPayload(head, length),
});
export const MPD_NO_RESPONSE = 'MPD_NO_RESPONSE';
export const MPD_ERROR = 'MPD_ERROR';

const NO_RESP_TYPES = [MPD_NO_RESPONSE, MPD_ERROR];

/*
** Querying MPD's status
*/
export const mpdStatus = () => createMPDSA([MPD_STATUS, MPD_ERROR], 'status');
export const mpdStats = () => createMPDSA([MPD_STATS, MPD_ERROR], 'stats');

/*
** PlaybackOptions
*/
const playbackOptions = [
  'consume',
  'random',
  'repeat',
  'single',
];
export const mpdPlaybackOption = (option, state) => {
  if (state !== 0 && state !== 1) {
    throw new Error(`State (value: ${state}) must be 0 or 1`);
  }
  if (playbackOptions.indexOf(option) === -1) {
    throw new Error(`Playback Option (value: ${option}) must be one of ${playbackOptions}`);
  }

  return createMPDSA(NO_RESP_TYPES, option, [state]);
};

export const mpdSetvol = (volume) => {
  if (typeof volume !== 'number') {
    throw new Error(`Volume (value: ${volume}) must be a number`);
  }

  const vol = volume > 100 ? 100 : volume < 0 ? 0 : volume;

  return createMPDSA(NO_RESP_TYPES, 'setvol', [vol]);
};

/*
** Controlling Playback
*/
export const mpdNext = () => createMPDSA(NO_RESP_TYPES, 'next');
export const mpdPause = (pause) => {
  if (pause !== 0 && pause !== 1) {
    throw new Error(`Pause (value: ${pause}) must be 0 or 1`);
  }

  return createMPDSA(NO_RESP_TYPES, 'pause', [pause]);
};
export const mpdPlay = (position = 0) => {
  if (typeof position !== 'number' || position < 0) {
    throw new Error(`Position (value: ${position}) must be a positive number`);
  }

  return createMPDSA(NO_RESP_TYPES, 'play', [position]);
};
export const mpdPlayid = (id) => {
  if (typeof id !== 'number' || id < 0) {
    throw new Error(`id (value: ${id}) must be a positive number`);
  }

  return createMPDSA(NO_RESP_TYPES, 'playid', [id]);
};
export const mpdPrevious = () => createMPDSA(NO_RESP_TYPES, 'previous');
export const mpdSeekcur = (time) => {
  if (typeof time !== 'number' || time < 0) {
    throw new Error(`Time (value: ${time}) must be a positive number`);
  }

  return createMPDSA(NO_RESP_TYPES, 'seekcur', [time]);
};
export const mpdStop = () => createMPDSA(NO_RESP_TYPES, 'stop');

/*
** The current playlist
*/
export const mpdPlchanges = (head, length, since = 0) => {
  if (typeof head !== 'number' || head < 0) {
    throw new Error(`Head (value: ${head}) must be a positive number`);
  }
  if (typeof length !== 'number' || length < 0) {
    throw new Error(`length (value: ${length}) must be a positive number`);
  }
  if (typeof since !== 'number' || since < 0) {
    throw new Error(`Since (value: ${since}) must be a positive number`);
  }

  return createMPDSA([mpdPlchangesType(head, length), MPD_ERROR], 'plchanges', [since]);
};
export const mpdPlchangesposid = (head, length, since = 0) => {
  if (typeof head !== 'number' || head < 0) {
    throw new Error(`Head (value: ${head}) must be a positive number`);
  }
  if (typeof length !== 'number' || length < 0) {
    throw new Error(`Head (value: ${length}) must be a positive number`);
  }
  if (typeof since !== 'number' || since < 0) {
    throw new Error(`Since (value: ${since}) must be a positive number`);
  }

  return createMPDSA([mpdPlchangesposidType(head, length), MPD_ERROR], 'plchangesposid', [since]);
};
export const mpdSwap = (position1, position2) => {
  if (typeof position2 !== 'number' || position2 < 0) {
    throw new Error(`position2 (value: ${position2}) must be a positive number`);
  }
  if (typeof position1 !== 'number' || position1 < 0) {
    throw new Error(`position1 (value: ${position1}) must be a positive number`);
  }

  return createMPDSA(NO_RESP_TYPES, 'swap', [position1, position2]);
};
export const mpdSwapid = (position1, position2) => {
  if (typeof position2 !== 'number' || position2 < 0) {
    throw new Error(`position2 (value: ${position2}) must be a positive number`);
  }
  if (typeof position1 !== 'number' || position1 < 0) {
    throw new Error(`position1 (value: ${position1}) must be a positive number`);
  }

  return createMPDSA(NO_RESP_TYPES, 'swapid', [position1, position2]);
};
