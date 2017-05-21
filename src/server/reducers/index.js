import { combineReducers } from 'redux';
import appStatus from './appStatus';
import playlist from './playlist';

export default combineReducers({ appStatus, playlist });
