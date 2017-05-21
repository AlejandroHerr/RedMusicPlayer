import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from './PureComponent';

export default class Artists extends Component {
  render() {
    const { artists, scope } = this.props;

    return (
      <div style={ { width:'20%' } }>
        { artists.map((artist, idx) => {
          if (idx === scope) {
            return (<p key={idx}><strong>{artist}</strong></p>);
          }
          return (<p key={idx}>{artist}</p>);
        })}
      </div>
    );
  }
}

Artists.defaultProps = {
};

Artists.propTypes = {
  artists: ImmutablePropTypes.list.isRequired,
  scope: React.PropTypes.number,
};
