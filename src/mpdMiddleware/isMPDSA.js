import { MPD_CLIENT } from './core';
//import isPlainObject from 'lodash/isplainobject';
//import isArray from 'lodash/isArray';
import { isArray, isPlainObject } from 'lodash';

const validKeys = [
  'types',
  'cmd',
];

export const isMPDSA = (action) => {
  if (!isPlainObject(action) || !action.hasOwnProperty(MPD_CLIENT) || !isPlainObject(action[MPD_CLIENT])) {
    return false;
  }
  const mpdAction = action[MPD_CLIENT];
  if (!Object.keys(mpdAction).every((key) => validKeys.indexOf(key) > -1)) {
    return false;
  }
  if (!isArray(mpdAction.types) || mpdAction.types.length !== 2) {
    return false;
  }
  if (!isArray(mpdAction.cmd) || mpdAction.cmd.length !== 2) {
    return false;
  }

  return true;
};
