import { Map, List, fromJS } from 'immutable';
import { constructStatus } from '../../model/constructors';
import { AppStatus } from '../../model/records';
import { MPD_STATUS, MPD_ERROR } from '../actions/commands';

const initialState = new AppStatus();
export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case MPD_STATUS:
        prevState.set('status', constructStatus(payload));
        break;
      case MPD_ERROR:
        prevState.set('error', payload);
        break;
      default:
    }
  });
