import { connect, cmd as makeCmd } from 'mpd';
import { parseResponse } from './utils';

const defaultConfig = {
  port: 6600,
  host: 'localhost',
};

export class MPDClient {
  constructor(config = defaultConfig) {
    this.config = config;
    this.client = null;
    this.connected = false;
    this.ready = false;
    this.queue = [];
  }
  connect() {
    this.client = connect(this.config);
    this.client.on('connect', () => {
      console.log('MPD connected.');
      this.connected = true;
      this.client.on('ready', () => {
        console.log('MPD client ready.');
        this.ready = true;
        this.queue.forEach((action) => {
          this.client.sendCommand(makeCmd(...action.cmd), action.cb);
        });
      });
    });

    return this;
  }
  sendCommand(cmd, cb) {
    const { client, ready, queue } = this;
    if (ready === true) {
      client.sendCommand(makeCmd(...cmd), cb);
    }
    else {
      queue.push({ cmd, cb });
    }

    return this;
  }

  on(event, cb) {
    const { client } = this;
    const callback = (err, res) => {
      let pRes = res;
      if (!err) {
        pRes = parseResponse(res);
      }
      cb(err, pRes);
    };
    client.on(event, callback);

    return this;
  }
}
