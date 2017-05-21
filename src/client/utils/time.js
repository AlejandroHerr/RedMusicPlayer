const toSeconds = (time) => {
  const seconds = Math.trunc(time % 60);
  if (seconds < 10) {
    return `0${seconds}`;
  }

  return `${seconds}`;
};
const toMinutes = (time) => {
  const minutes = Math.trunc(time / 60);
  if (minutes < 10) {
    return `0${minutes}`;
  }

  return `${minutes}`;
};
export const toHumanTime = (time) => `${toMinutes(time)}:${toSeconds(time)}`;