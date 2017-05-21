import React from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Component from './PureComponent';
import { toHumanTime } from '../utils/time';

export default class PlayerProgress extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { state } = this.props;
    if (state === 'play') {
      return true;
    }

    return super.shouldComponentUpdate(nextProps, nextState);
  }
  render() {
    const { offset, start, state, time } = this.props;
    const elapsed = (state === 'play') ? ((Date.now() - start) / 1000 + offset) : offset;
    const elapsedPerc = elapsed / time * 100;
    return (
      <div>
        <ProgressBar active now={elapsedPerc} label={`${toHumanTime(elapsed)}`} striped />
        <p>{`${state}: ${toHumanTime(elapsed)}/${toHumanTime(time)}`}</p>
      </div>);
  }
}

PlayerProgress.propTypes = {
  offset: React.PropTypes.number.isRequired,
  start: React.PropTypes.number.isRequired,
  state: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
};
