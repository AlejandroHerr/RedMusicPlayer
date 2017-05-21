/* global describe, it */
/* eslint no-undefined: 0 */
import { expect } from 'chai';
import { parseResponse } from '../../../src/mpdMiddleware/utils';
import { MPD_STATUS, MPD_ERROR } from '../../../src/server/actions/commands';
import reducer from '../../../src/server/reducers/appStatus';
import { constructStatus } from '../../../src/model/constructors';
import { AppStatus } from '../../../src/model/records';
import { status as statusMock } from '../../mpd/mock/mpd_response_mock';

describe('status reducer', () => {
  const prevState = new AppStatus();
  it('should return the initial state', () => {
    const nextState = reducer(undefined, { type: '@@redux/INIT' });
    expect(nextState).to.equal(prevState);
  });
  it('should handle MPD_STATUS', () => {
    const response = parseResponse(statusMock);
    const status = constructStatus(response);
    const nextState = reducer(prevState, {
      type: MPD_STATUS,
      payload: response,
    });

    expect(nextState.status).to.equal(status);
    expect(nextState).to.equal(new AppStatus({ status }));
  });
  it('should handle MPD_ERROR', () => {
    const error = 'The monkeys got crazy!';
    const nextState = reducer(prevState, {
      type: MPD_ERROR,
      payload: error,
    });
    expect(nextState.error).to.equal(error);
    expect(nextState).to.equal(new AppStatus({ error }));
  });
});
