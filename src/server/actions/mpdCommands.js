import { MPD_CLIENT } from 'mpd/core';
import { parseObject, parseArray, parseArrayObject } from 'mpd/utils';
import { UPDATE_STATUS, UPDATE_PLAYLIST, UPDATE_LIBRARY } from './';

const MPD_ERROR = 'MPD_ERROR';

export const mpdPlay = (position) => ({
  [MPD_CLIENT]: {
    cmd: ['play', [position]],
    types: ['NOTHING', MPD_ERROR],
  },
});

export const mpdPause = (pause = 1) => ({
  [MPD_CLIENT]: {
    cmd: ['pause', [pause]],
    types: ['NOTHING', MPD_ERROR],
  },
});

export const mpdStop = () => ({
  [MPD_CLIENT]: {
    cmd: ['stop', []],
    types: ['NOTHING', MPD_ERROR],
  },
});

export const mpdPrevious = () => ({
  [MPD_CLIENT]: {
    cmd: ['previous', []],
    types: ['NOTHING', MPD_ERROR],
  },
});
export const mpdNext = () => ({
  [MPD_CLIENT]: {
    cmd: ['next', []],
    types: ['NOTHING', MPD_ERROR],
  },
});

export const mpdSeekcur = (elapsed) => ({
  [MPD_CLIENT]: {
    cmd: ['seekcur', [elapsed]],
    types: ['NOTHING', MPD_ERROR],
  },
});

export const mpdStatusCmd = () => ({
  [MPD_CLIENT]: {
    cmd: ['status', []],
    types: [UPDATE_STATUS, MPD_ERROR],
    transformer: (res) => ({ status: parseObject(res) }),
  },
});

export const mpdPlChangesCmd = (length = 0, head = 0, since = 0) => ({
  [MPD_CLIENT]: {
    cmd: ['plchanges', [since]],
    types: [UPDATE_PLAYLIST, MPD_ERROR],
    transformer: (res) => ({ songs: parseArrayObject(res), head, length }),
  },
});

export const mpdUpdatePaybackCmd = (key, value) => ({
  [MPD_CLIENT]: {
    cmd: [key, [value === true ? 1 : 0]],
    types: ['MPD_NOTHING', MPD_ERROR],
  },
});

export const mpdSetvolCmd = (value) => ({
  [MPD_CLIENT]: {
    cmd: ['setvol', [value]],
    types: ['MPD_NOTHING', MPD_ERROR],
  },
});

export const mpdList = (client, type, filters = [], groups = []) => {
  const args = [type];

  filters.forEach((filter) => args.push(...filter));
  groups.forEach((group) => args.push('group', group));

  return {
    [MPD_CLIENT]: {
      cmd: ['list', args],
      types: [UPDATE_LIBRARY, MPD_ERROR],
      transformer: (res) => ({ client, type, payload: parseArrayObject(res) }),
    },
  };
};

export const mpdFind = (client, filters = []) => {
  const args = [];

  filters.forEach((filter) => args.push(...filter));

  return {
    [MPD_CLIENT]: {
      cmd: ['find', args],
      types: [UPDATE_LIBRARY, MPD_ERROR],
      transformer: (res) => ({ client, songs: parseArrayObject(res) }),
    },
  };
};
