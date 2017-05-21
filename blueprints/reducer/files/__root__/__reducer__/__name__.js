import { Map, List, fromJS } from 'immutable';
import { } from 'actions';

const initialState = fromJS();

export default (state = initialState, action) => state
  .withMutations((prevState) => {
    const type = action.type;
    const payload = action.payload;

    switch (type) {

      //  case ACTION:
      //    break;
      default:
    }
  });
