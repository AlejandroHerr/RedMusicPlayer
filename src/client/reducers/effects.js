import { Map, List, fromJS } from 'immutable';
import { UPDATE_EFFECT } from '../actions';

const initialState = new Map({
  showVolume: false,
});

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_EFFECT:
        prevState.set(payload.key, payload.value);
        break;
      default:
    }
  });
