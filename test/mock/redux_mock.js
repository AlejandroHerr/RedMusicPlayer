const dispatched = [];
export const fakeDispatch = (action) => dispatched.push(action);
export const getDispatched = () => dispatched;
const next = [];
export const fakeNext = (action) => next.push(action);
export const getNext = () => next;

export const clearDispatched = () => {
  while(dispatched.length > 0) { dispatched.pop(); }
};
export const clearNext = () => {
  while(next.length > 0) { next.pop(); }
};
