export const observeStore = ({ dispatch, getState, subscribe }, select, onChange, cmp = (s1, s2) => s1 === s2) => {
  let currentState = select(getState());
  let prevState = currentState;
  function handleChange() {
    const nextState = select(getState());
    if (!cmp(currentState, nextState)) {
      prevState = currentState;
      currentState = nextState;
      onChange(dispatch, currentState, prevState);
    }
  }

  const unsubscribe = subscribe(handleChange);
  handleChange();

  return unsubscribe;
};
