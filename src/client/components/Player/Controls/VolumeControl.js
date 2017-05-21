import React from 'react';
import classNames from 'classnames';
import Icon from 'react-fa';
import Component from '../../PureComponent';
import ProgressBar from '../../ProgressBar';

export default class VolumeControl extends Component {
  render() {
    const { classnames, disabled, fixedWidth, icon, volume, onClick, show, updateEffect } = this.props;

    return (
      <li>
        <div
          className={'player-volume'}
          onMouseEnter={() => updateEffect('showVolume', true)}
          onMouseLeave={() => updateEffect('showVolume', false)}>
        <ProgressBar className='volume' onClick={(s) => onClick(Math.trunc(s))} progress={volume} show={show} />
        <a><Icon name='volume-up' fixedWidth/></a>
      </div></li>
    );
  }
}

VolumeControl.defaultProps = {
  classnames: [],
  disabled: false,
  fixedWidth: false,
  show: false,
  volume: 0,
};

VolumeControl.propTypes = {
  classnames: React.PropTypes.array,
  disabled: React.PropTypes.bool,
  fixedWidth: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  volume: React.PropTypes.number,
  //icon: React.PropTypes.string.isRequired,
};
