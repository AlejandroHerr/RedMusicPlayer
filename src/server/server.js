import express from 'express';
import { createServer } from 'http';
import { startSocket } from './socket';
import createStore from './store/createStore';
import { observeStore } from 'server-redux';
import socketio from 'socket.io';
import addHotMiddleware from '../../webpack/addHotReloading';
import { mpdListen } from './mpd';
import { MPDClient } from 'mpd/MPDClient';

const mpdClient = new MPDClient();
mpdClient.connect();
const store = createStore(mpdClient);

mpdListen(mpdClient, store);

//mpdListen(store);
//const PORT = process.env.PORT || 8080;

const app = express();
export const server = createServer(app);
//const io = socketio(server);
const io = startSocket(server, store);

addHotMiddleware(app);
app.get('/', (req, res) => {
  res.sendFile('/index.html');
});
