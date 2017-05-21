import { MPD_CLIENT } from './core';

export const createMPDSA = (types, cmd, args = []) => ({
  [MPD_CLIENT]: {
    cmd: [cmd, args],
    types,
  },
});
