import { statusRes } from './mpd_response_mock.js';

const command = [];
export const fakeMpdClient = {
  sendCommand: (cmd, callBack) => {
    command.push(cmd);
    //callBack('A terrible error happened.');
    //callBack(null, statusRes);
  },
  getCmd: () => command.pop(),
  clearCmd: () => {
    while(command.length > 0) { command.pop(); }
  },
};
