import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Component from '../PureComponent';
import PlaylistSong from './PlaylistSong';
import { Song } from 'mpd/core';
//import scroller from 'react-scroll/lib/mixins/scroller';
var Scroll = require('react-scroll');
var Link    = Scroll.Link;
var Events  = Scroll.Events;
var Element = Scroll.Element;
var scroller = Scroll.scroller;
/*
<Element name="myScrollToElement"></Element>

// Somewhere else, even another file
scroller.scrollTo('myScrollToElement', {
  duration: 1500,
  delay: 100,
  smooth: true,
})*/


export default class Playlist extends Component {
  render() {
    const { playlist: { songs } } = this.props;

    return (
      <div style={{overflowY: 'scroll', height:'200px'}}>
        <ul>
          { songs.map((song) => (<PlaylistSong key={song.pos} name={`${song.pos}`} song={song} />))}
        </ul>
      </div>);
  }
}

Playlist.defaultProps = {
};

Playlist.propTypes = {
  playlist: ImmutablePropTypes.record.isRequired,
};
