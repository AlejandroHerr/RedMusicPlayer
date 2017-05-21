import { getTypes } from './utils';

const createAction = (res, { type, payload }) => ({
  type,
  payload: payload(res),
});

export const createMPDCb = (dispatch, types) => {
  const [successType, errorType] = getTypes(types);

  return (err, res) => {
    if (err) {
      dispatch(createAction(err, errorType));
      return;
    }
    dispatch(createAction(res, successType));
  };
};
