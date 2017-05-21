import { combineReducers } from 'redux';
import effects from './effects';
import playlist from './playlist';
import player from './player';

export default combineReducers({ effects, playlist, player });
