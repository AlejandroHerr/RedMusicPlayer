import React from 'react';
import classNames from 'classnames';
import Icon from 'react-fa';
import Component from '../../PureComponent';

export default class PlayerControl extends Component {
  render() {
    const { classname, disabled, fixedWidth, icon, onClick } = this.props;
    const child = (<Icon fixedWidth={fixedWidth} name={icon}/>);

    if (disabled) {
      return (
        <li>
          <a className={ classNames('player-control', classname, 'disabled') } disabled>
            {child}
          </a>
        </li>
      );
    }

    return (
      <li>
        <a className={ classNames('player-control', classname) } onClick={onClick}>
          {child}
        </a>
      </li>
    );
  }
}

PlayerControl.defaultProps = {
  disabled: false,
  fixedWidth: false,
};

PlayerControl.propTypes = {
  classname: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  fixedWidth: React.PropTypes.bool,
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
