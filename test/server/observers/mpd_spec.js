/* global describe, it */
/* eslint no-undefined: 0 */
import { expect } from 'chai';
import { MPD_CLIENT } from '../../../src/mpdMiddleware/core';
import { parseResponse } from '../../../src/mpdMiddleware/utils';
import { MPD_STATUS } from '../../../src/server/actions/commands';
import { statusMapper, statusDispatcher, statusEquals } from '../../../src/server/observers/status';
import { mpdPlchanges, mpdPlchangesposid } from '../../../src/server/actions/commands';
import { shallowEquals } from 'redux-observers';
import { status, statusPlaylistAdd, statusPlaylistRemove, statusPlaylistMove } from '../../mpd/mock/mpd_response_mock';
import reducers from '../../../src/server/reducers';

const actions = [];
const dispatch = (action) => {
  actions.push(action);

  return action;
};
const getActions = () => actions;
const initialState = reducers(undefined, { type: '@@redux/INIT' });
const statusAction = (response) => ({
  type: MPD_STATUS,
  payload: parseResponse(response),
});

describe('mpd observer', () => {
  describe('status observer', () => {
    let prevState = initialState;
    it('should send `plchanges` when playlist start', () => {
      const state = reducers(prevState, statusAction(status));
      const observedPrevState = statusMapper(prevState);
      const observedState = statusMapper(state);
      expect(statusEquals(observedPrevState, observedState)).to.equal(false);
      const action = mpdPlchanges(observedState.head, observedState.length, observedPrevState.head);
      statusDispatcher(dispatch, observedState, observedPrevState);
      const actionDispatched = getActions().shift();
      expect(getActions()).to.have.lengthOf(0);
      expect(actionDispatched).to.have.ownProperty(MPD_CLIENT);
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('cmd');
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('types');
      expect(actionDispatched[MPD_CLIENT].cmd).to.deep.equal(action[MPD_CLIENT].cmd);
      prevState = state;
    });
    it('should do nothing when nothing changes', () => {
      const state = reducers(prevState, statusAction(status));
      const observedPrevState = statusMapper(prevState);
      const observedState = statusMapper(state);
      expect(statusEquals(observedPrevState, observedState)).to.equal(true);
      prevState = state;
    });
    it('should send command `plchanges` when playlist grows', () => {
      const state = reducers(prevState, statusAction(statusPlaylistAdd));
      const observedPrevState = statusMapper(prevState);
      const observedState = statusMapper(state);
      expect(statusEquals(observedPrevState, observedState)).to.equal(false);
      const action = mpdPlchanges(observedState.head, observedState.length, observedPrevState.head);
      statusDispatcher(dispatch, observedState, observedPrevState);
      const actionDispatched = getActions().shift();
      expect(getActions()).to.have.lengthOf(0);
      expect(actionDispatched).to.have.ownProperty(MPD_CLIENT);
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('cmd');
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('types');
      expect(actionDispatched[MPD_CLIENT].cmd).to.deep.equal(action[MPD_CLIENT].cmd);
      prevState = state;
    });
    it('should send command `plchanges` when playlist shrinks', () => {
      const state = reducers(prevState, statusAction(statusPlaylistRemove));
      const observedPrevState = statusMapper(prevState);
      const observedState = statusMapper(state);
      expect(statusEquals(observedPrevState, observedState)).to.equal(false);
      const action = mpdPlchangesposid(observedState.head, observedState.length, observedPrevState.head);
      statusDispatcher(dispatch, observedState, observedPrevState);
      const actionDispatched = getActions().shift();
      expect(getActions()).to.have.lengthOf(0);
      expect(actionDispatched).to.have.ownProperty(MPD_CLIENT);
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('cmd');
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('types');
      expect(actionDispatched[MPD_CLIENT].cmd).to.deep.equal(action[MPD_CLIENT].cmd);
      prevState = state;
    });
    it('should send command `plchanges` when playlist moves', () => {
      const state = reducers(prevState, statusAction(statusPlaylistMove));
      const observedPrevState = statusMapper(prevState);
      const observedState = statusMapper(state);
      expect(statusEquals(observedPrevState, observedState)).to.equal(false);
      const action = mpdPlchangesposid(observedState.head, observedState.length, observedPrevState.head);
      statusDispatcher(dispatch, observedState, observedPrevState);
      const actionDispatched = getActions().shift();
      expect(getActions()).to.have.lengthOf(0);
      expect(actionDispatched).to.have.ownProperty(MPD_CLIENT);
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('cmd');
      expect(actionDispatched[MPD_CLIENT]).to.have.ownProperty('types');
      expect(actionDispatched[MPD_CLIENT].cmd).to.deep.equal(action[MPD_CLIENT].cmd);
      prevState = state;
    });
  });
});
