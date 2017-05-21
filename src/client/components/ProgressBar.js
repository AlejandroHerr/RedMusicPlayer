import React from 'react';
import classNames from 'classnames';
import Component from './PureComponent';
import './ProgressBar.less';

const seeker = (action, offset, max) => (event) => {
  const offsetX = event.nativeEvent.offsetX;
  const offsetWidth = event.target.offsetWidth;
  const className = event.target.className;
  let seeked;
  if (className === 'bar') {
    seeked = max * offsetX / offsetWidth;
  }
  else {
    seeked = offset * offsetX / offsetWidth;
  }
  action(seeked);
};

export default class ProgressBar extends Component {
  render() {
    const { active, className, onClick, progress, progressMax, show } = this.props;
    const progressPerc = progress / progressMax * 100;

    return (
      <div className={classNames('progressbar', className, { active, hide: !show })}>
        <div className='bar' onClick={ active ? seeker(onClick, progress, progressMax) : null}>
          <div className='progress' style={{ width: `${progressPerc}%` }}/>
        </div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  active: true,
  progressMax: 100,
  show: true,
};

ProgressBar.propTypes = {
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  progress: React.PropTypes.number.isRequired,
  progressMax: React.PropTypes.number,
  show: React.PropTypes.bool,
};
