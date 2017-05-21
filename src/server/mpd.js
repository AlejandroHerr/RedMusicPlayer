import { mpdStatusCmd } from './actions/mpdCommands';
import { startPlObserver } from './observers/mpd';

export const mpdListen = (mpdClient, store) => {
  const { dispatch } = store;

  dispatch(mpdStatusCmd());
  startPlObserver(store);

  mpdClient.on('system', () => dispatch(mpdStatusCmd()));
};
