import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from '../PureComponent';
import ProgressBar from '../ProgressBar';
import { toHumanTime } from '../../utils/time';

export default class PlayerProgressBar extends Component {
  constructor(props) {
    super(props);
    this.ticker = null;
  }
  componentWillMount() {
    const { status } = this.props;

    if (status.state === 'play') {
      this.setTimer(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { status: nextStatus } = nextProps;
    const { status } = this.props;

    if (nextStatus.state === 'play' && status.state !== 'play') {
      this.setTimer(nextProps);
    }
    else if (nextStatus.state !== 'play' && status.state === 'play') {
      this.clearTimer();
    }
    else if (nextStatus.state === 'play' &&
      (status.elapsed !== nextStatus.elapsed || status.time !== nextStatus.time)) {
      this.clearTimer();
      this.setTimer(nextProps);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { status } = this.props;

    return status.state === 'play' || super.shouldComponentUpdate(nextProps, nextState);
  }
  componentDidUpdate(prevState) {
    const { timer: { ticks: prevTicks } } = prevState;
    const { refresh, status: { state }, timer: { ticks } } = this.props;

    if (ticks === 0 && prevTicks !== ticks && state === 'play') {
      refresh();
    }
  }
  clearTimer() {
    const { timerActions: { kill } } = this.props;
    clearInterval(this.ticker);
    kill();
  }
  setTimer(props) {
    const { timerActions: { start, tick } } = props;
    start(Date.now());
    this.ticker = setInterval(() => tick(), 1000);
  }

  render() {
    const { actions: { seek }, status: { elapsed, state, time }, timer } = this.props;
    const elapsedReal = state === 'play' ?
      (Date.now() - timer.get('start')) / 1000 + elapsed : elapsed;

    return (
      <div className='player-progress'>
        <div className='current-time'>{toHumanTime(elapsedReal)}</div>
        <div className='duration'>{toHumanTime(time)}</div>
        <ProgressBar active={state !== 'stop'} onClick={seek} progress={elapsedReal} progressMax={time}/>
      </div>);
  }
}

PlayerProgressBar.defaultProps = {
};

PlayerProgressBar.propTypes = {
  actions: React.PropTypes.shape({
    seek: React.PropTypes.func.isRequired,
  }),
  refresh: React.PropTypes.func.isRequired,
  status: ImmutablePropTypes.record.isRequired,
  timer: ImmutablePropTypes.record.isRequired,
  timerActions: React.PropTypes.shape({
    kill: React.PropTypes.func.isRequired,
    start: React.PropTypes.func.isRequired,
    tick: React.PropTypes.func.isRequired,
  }),
};
