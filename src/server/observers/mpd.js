import shallowEqual from 'fbjs/lib/shallowEqual';
import { observeStore } from '../../server-redux';
import { mpdPlchanges, mpdPlchangesposid } from '../actions/commands';

const plObserverSelector = ({ appStatus }) => ({
  head: appStatus.status.playlist,
  length: appStatus.status.playlistlength,
});

const plObserverHandler = (dispatch, state, prevState) => {
  if (state.length > prevState.length) {
    dispatch(mpdPlchanges(state.head, state.length, prevState.head));
  }
  else {
    dispatch(mpdPlchangesposid(state.head, state.length, prevState.head));
  }
};

export const startPlaylistObserver = (store) => observeStore(store, plObserverSelector, plObserverHandler, shallowEqual);
