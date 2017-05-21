import { mpdPlchanges, mpdPlchangesposid } from '../actions/commands';

export const statusMapper = ({ appStatus }) => ({
  head: appStatus.status.playlist,
  length: appStatus.status.playlistlength,
});

export const statusDispatcher = (dispatch, nextState, prevState) => {
  if (nextState.length > prevState.length) {
    dispatch(mpdPlchanges(nextState.head, nextState.length, prevState.head));
  }
  else {
    dispatch(mpdPlchangesposid(nextState.head, nextState.length, prevState.head));
  }
};

export const statusEquals = (prevState, nextState) => prevState.head === nextState.head;
