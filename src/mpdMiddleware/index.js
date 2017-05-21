import { MPD_CLIENT } from './core';
import { isMPDSA } from './isMPDSA';
import { createMPDCb } from './createMPDCb';

export const createMPDMiddleware = (mpdClient) => ({ dispatch }) => (next) => (action) => {
  if (!isMPDSA(action)) {
    return next(action);
  }

  const { cmd, types } = action[MPD_CLIENT];
  mpdClient.sendCommand(cmd, createMPDCb(dispatch, types));

  return {type:'random'};
};
