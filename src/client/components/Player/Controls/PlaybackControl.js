import React from 'react';
import classNames from 'classnames';
import Component from '../../PureComponent';

export default class PlaybackControl extends Component {
  render() {
    const { classnames, disabled, letter, onClick } = this.props;

    if (disabled) {
      return (
        <li><a className={ classNames(...classnames, 'disabled') } onClick={onClick} disabled>
          {letter}
        </a></li>
      );
    }

    return (
      <li><a className={ classNames(...classnames) } onClick={onClick}>
          {letter}
      </a></li>
    );
  }
}

PlaybackControl.defaultProps = {
  classnames: [],
  disabled: false,
  fixedWidth: false,
};

PlaybackControl.propTypes = {
  classnames: React.PropTypes.array,
  disabled: React.PropTypes.bool,
  letter: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
