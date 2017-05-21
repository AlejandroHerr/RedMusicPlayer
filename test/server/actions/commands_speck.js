/* global describe, it */
import { expect } from 'chai';
import { MPD_CLIENT } from '../../../src/mpdMiddleware/core';
import {
  MPD_STATUS,
  MPD_STATS,
  mpdPlchangesType,
  mpdPlchangesposidType,
  MPD_ERROR,
  MPD_NO_RESPONSE,
  mpdStatus,
  mpdStats,
  mpdPlaybackOption,
  mpdSetvol,
  mpdNext,
  mpdPause,
  mpdPlay,
  mpdPlayid,
  mpdPrevious,
  mpdSeekcur,
  mpdStop,
  mpdPlchanges,
  mpdPlchangesposid,
  mpdSwap,
  mpdSwapid,
} from '../../../src/server/actions/commands';

describe('MPD commands creators', () => {
  describe('Querying MPD\'s status', () => {
    describe('mpdStatus', () => {
      it('should create a status command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_STATUS, MPD_ERROR],
            cmd: ['status', []],
          },
        };
        const createdCmd = mpdStatus();
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdStats', () => {
      it('should create a stats command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_STATS, MPD_ERROR],
            cmd: ['stats', []],
          },
        };
        const createdCmd = mpdStats();
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
  });
  describe('PlaybackOptions', () => {
    describe('mpdPlaybackOption', () => {
      it('should throw error if wrong options', () => {
        expect(() => mpdPlaybackOption('potatoe', 0)).to.throw(Error);
        expect(() => mpdPlaybackOption('repeat', 0)).to.not.throw(Error);
      });
      it('should throw error if wrong state', () => {
        expect(() => mpdPlaybackOption('consume')).to.throw(Error);
        expect(() => mpdPlaybackOption('consume', '0')).to.throw(Error);
        expect(() => mpdPlaybackOption('consume', 5)).to.throw(Error);
        expect(() => mpdPlaybackOption('random', 0)).to.not.throw(Error);
      });
      it('should create playbackOption command', () => {
        let cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['consume', [0]],
          },
        };
        let createdCmd = mpdPlaybackOption('consume', 0);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
        cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['single', [1]],
          },
        };
        createdCmd = mpdPlaybackOption('single', 1);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdSetvol', () => {
      it('should throw error if wrong volume', () => {
        expect(() => mpdSetvol({})).to.throw(Error);
        expect(() => mpdSetvol('0')).to.throw(Error);
        expect(() => mpdSetvol(0)).to.not.throw(Error);
      });
      it('should create setvol command', () => {
        let cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['setvol', [0]],
          },
        };
        let createdCmd = mpdSetvol(0);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
        createdCmd = mpdSetvol(-100);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
        cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['setvol', [100]],
          },
        };
        createdCmd = mpdSetvol(120);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
  });
  describe('Controlling Playback', () => {
    describe('mpdNext', () => {
      it('should create a next command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['next', []],
          },
        };
        const createdCmd = mpdNext();
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('Pause', () => {
      it('should throw error if pause is not 0 or 1', () => {
        expect(() => mpdPause({})).to.throw(Error);
        expect(() => mpdPause('0')).to.throw(Error);
        expect(() => mpdPause(5)).to.throw(Error);
        expect(() => mpdPause(0)).to.not.throw(Error);
      });
      it('should create pause command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['pause', [0]],
          },
        };
        const createdCmd = mpdPause(0);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdPlay', () => {
      it('should throw error if position is not a positive number', () => {
        expect(() => mpdPlay({})).to.throw(Error);
        expect(() => mpdPlay('0')).to.throw(Error);
        expect(() => mpdPlay(-1988)).to.throw(Error);
        expect(() => mpdPlay(0)).to.not.throw(Error);
      });
      it('should create play command', () => {
        let cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['play', [10]],
          },
        };
        let createdCmd = mpdPlay(10);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
        createdCmd = mpdPlay();
        cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['play', [0]],
          },
        };
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdPlayid', () => {
      it('should throw error if id is not a positive number', () => {
        expect(() => mpdPlayid({})).to.throw(Error);
        expect(() => mpdPlayid('0')).to.throw(Error);
        expect(() => mpdPlayid(-1988)).to.throw(Error);
        expect(() => mpdPlayid(0)).to.not.throw(Error);
      });
      it('should create playid command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['playid', [0]],
          },
        };
        let createdCmd = mpdPlayid(0);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdPrevious', () => {
      it('should create a previous command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['previous', []],
          },
        };
        const createdCmd = mpdPrevious();
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdSeekcur', () => {
      it('should throw error if wrong volume', () => {
        expect(() => mpdSeekcur({})).to.throw(Error);
        expect(() => mpdSeekcur('0')).to.throw(Error);
        expect(() => mpdSeekcur(-10)).to.throw(Error);
        expect(() => mpdSeekcur(0)).to.not.throw(Error);
      });
      it('should create seekcur command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['seekcur', [50]],
          },
        };
        const createdCmd = mpdSeekcur(50);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdStop', () => {
      it('should create a stop command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['stop', []],
          },
        };
        const createdCmd = mpdStop();
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
  });
  describe('The Current Playlist', () => {
    describe('mpdPlchanges', () => {
      it('should throw error if head is not a positive number', () => {
        expect(() => mpdPlchanges(null, 10)).to.throw(Error);
        expect(() => mpdPlchanges({}, 10)).to.throw(Error);
        expect(() => mpdPlchanges('0', 10)).to.throw(Error);
        expect(() => mpdPlchanges(-1988, 10)).to.throw(Error);
        expect(() => mpdPlchanges(0, 10)).to.not.throw(Error);
      });
      it('should throw error if length is not a positive number', () => {
        expect(() => mpdPlchanges(10, {})).to.throw(Error);
        expect(() => mpdPlchanges(10, '0')).to.throw(Error);
        expect(() => mpdPlchanges(10, -1988)).to.throw(Error);
        expect(() => mpdPlchanges(10, 0)).to.not.throw(Error);
      });
      it('should throw error if since is not a positive number', () => {
        expect(() => mpdPlchanges(10, 10, {})).to.throw(Error);
        expect(() => mpdPlchanges(10, 10, '0')).to.throw(Error);
        expect(() => mpdPlchanges(10, 10, -1988)).to.throw(Error);
        expect(() => mpdPlchanges(10, 10, 0)).to.not.throw(Error);
      });
      it('should create plchanges command', () => {
        let cmd = {
          [MPD_CLIENT]: {
            types: [mpdPlchangesType(10, 10), MPD_ERROR],
            cmd: ['plchanges', [100]],
          },
        };
        let createdCmd = mpdPlchanges(10, 10, 100);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT].cmd).to.deep.equal(cmd[MPD_CLIENT].cmd);
        expect(createdCmd[MPD_CLIENT].types[0].type)
          .to.deep.equal(cmd[MPD_CLIENT].types[0].type);
        expect(createdCmd[MPD_CLIENT].types[1])
          .to.deep.equal(cmd[MPD_CLIENT].types[1]);
        expect(createdCmd[MPD_CLIENT].types[0].payload('err', 'res'))
          .to.deep.equal(cmd[MPD_CLIENT].types[0].payload('err', 'res'));

        cmd = {
          [MPD_CLIENT]: {
            types: [mpdPlchangesType(10, 10), MPD_ERROR],
            cmd: ['plchanges', [0]],
          },
        };
        createdCmd = mpdPlchanges(10, 10);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT].cmd).to.deep.equal(cmd[MPD_CLIENT].cmd);
        expect(createdCmd[MPD_CLIENT].types[0].type)
          .to.deep.equal(cmd[MPD_CLIENT].types[0].type);
          expect(createdCmd[MPD_CLIENT].types[1])
          .to.deep.equal(cmd[MPD_CLIENT].types[1]);
        expect(createdCmd[MPD_CLIENT].types[0].payload('err', 'res'))
          .to.deep.equal(cmd[MPD_CLIENT].types[0].payload('err', 'res'));
      });
    });
    describe('mpdPlchangesposid', () => {
      it('should throw error if head is not a positive number', () => {
        expect(() => mpdPlchangesposid(null, 10)).to.throw(Error);
        expect(() => mpdPlchangesposid({}, 10)).to.throw(Error);
        expect(() => mpdPlchangesposid('0', 10)).to.throw(Error);
        expect(() => mpdPlchangesposid(-1988, 10)).to.throw(Error);
        expect(() => mpdPlchangesposid(0, 10)).to.not.throw(Error);
      });
      it('should throw error if length is not a positive number', () => {
        expect(() => mpdPlchangesposid(10, {})).to.throw(Error);
        expect(() => mpdPlchangesposid(10, '0')).to.throw(Error);
        expect(() => mpdPlchangesposid(10, -1988)).to.throw(Error);
        expect(() => mpdPlchangesposid(10, 0)).to.not.throw(Error);
      });
      it('should throw error if since is not a positive number', () => {
        expect(() => mpdPlchangesposid(10, 10, {})).to.throw(Error);
        expect(() => mpdPlchangesposid(10, 10, '0')).to.throw(Error);
        expect(() => mpdPlchangesposid(10, 10, -1988)).to.throw(Error);
        expect(() => mpdPlchangesposid(10, 10, 0)).to.not.throw(Error);
      });
      it('should create plchangesposid command', () => {
        let cmd = {
          [MPD_CLIENT]: {
            types: [mpdPlchangesposidType(10, 10), MPD_ERROR],
            cmd: ['plchangesposid', [100]],
          },
        };
        let createdCmd = mpdPlchangesposid(10, 10, 100);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT].cmd).to.deep.equal(cmd[MPD_CLIENT].cmd);
        expect(createdCmd[MPD_CLIENT].types[0].type)
          .to.deep.equal(cmd[MPD_CLIENT].types[0].type);
        expect(createdCmd[MPD_CLIENT].types[1])
          .to.deep.equal(cmd[MPD_CLIENT].types[1]);
        expect(createdCmd[MPD_CLIENT].types[0].payload('err', 'res'))
          .to.deep.equal(cmd[MPD_CLIENT].types[0].payload('err', 'res'));

        cmd = {
          [MPD_CLIENT]: {
            types: [mpdPlchangesposidType(10, 10), MPD_ERROR],
            cmd: ['plchangesposid', [0]],
          },
        };
        createdCmd = mpdPlchangesposid(10, 10);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT].cmd).to.deep.equal(cmd[MPD_CLIENT].cmd);
        expect(createdCmd[MPD_CLIENT].types[0].type)
          .to.deep.equal(cmd[MPD_CLIENT].types[0].type);
          expect(createdCmd[MPD_CLIENT].types[1])
          .to.deep.equal(cmd[MPD_CLIENT].types[1]);
        expect(createdCmd[MPD_CLIENT].types[0].payload('err', 'res'))
          .to.deep.equal(cmd[MPD_CLIENT].types[0].payload('err', 'res'));
      });
    });
    describe('mpdSwap', () => {
      it('should throw error if positions are not a positive number', () => {
        expect(() => mpdSwap(1)).to.throw(Error);
        expect(() => mpdSwap(1, {})).to.throw(Error);
        expect(() => mpdSwap(1, '0')).to.throw(Error);
        expect(() => mpdSwap(1, -1)).to.throw(Error);
        expect(() => mpdSwap({}, 1)).to.throw(Error);
        expect(() => mpdSwap('0', 1)).to.throw(Error);
        expect(() => mpdSwap(-1, 1)).to.throw(Error);
        expect(() => mpdSwap(1, 20)).to.not.throw(Error);

      });
      it('should create swap command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['swap', [10, 20]],
          },
        };
        const createdCmd = mpdSwap(10, 20);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
    describe('mpdSwapid', () => {
      it('should throw error if ids are not a positive number', () => {
        expect(() => mpdSwapid(1)).to.throw(Error);
        expect(() => mpdSwapid(1, {})).to.throw(Error);
        expect(() => mpdSwapid(1, '0')).to.throw(Error);
        expect(() => mpdSwapid(1, -1)).to.throw(Error);
        expect(() => mpdSwapid({}, 1)).to.throw(Error);
        expect(() => mpdSwapid('0', 1)).to.throw(Error);
        expect(() => mpdSwapid(-1, 1)).to.throw(Error);
        expect(() => mpdSwapid(1, 20)).to.not.throw(Error);

      });
      it('should create swapid command', () => {
        const cmd = {
          [MPD_CLIENT]: {
            types: [MPD_NO_RESPONSE, MPD_ERROR],
            cmd: ['swapid', [10, 20]],
          },
        };
        const createdCmd = mpdSwapid(10, 20);
        expect(createdCmd).to.deep.equal(cmd);
        expect(createdCmd[MPD_CLIENT]).to.deep.equal(cmd[MPD_CLIENT]);
      });
    });
  });
});
