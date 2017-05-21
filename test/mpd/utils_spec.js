/* global describe, it */
import { expect } from 'chai';
import { toLowerCamelCase, parseResponse } from '../../src/mpdMiddleware/utils';
import { statusKeys, status, song, plchangesInitial } from './mock/mpd_response_mock';
describe('MPD utils', () => {
  describe('toLowerCamelCase', () => {
    it('should transform strings to lowerCameCase', () => {
      expect(toLowerCamelCase('lowerCamelCase')).to.equal('lowerCamelCase');
      expect(toLowerCamelCase('LowerCamelCase')).to.equal('lowerCamelCase');
      expect(toLowerCamelCase('Lower camel case')).to.equal('lowerCamelCase');
      expect(toLowerCamelCase('Lower-camel-case')).to.equal('lowerCamelCase');
      expect(toLowerCamelCase('lower_camel-case')).to.equal('lowerCamelCase');
    });
  });
  describe('parseResponse', () => {
    it('should transform keyvalue responses into an objects', () => {
      const response = parseResponse(status);
      expect(response).to.be.an('object');
      expect(response).to.have.all.keys(statusKeys);
    });
    it('should camelCase keys of keyvalue responses', () => {
      const response = parseResponse(song);
      Object.keys(response).forEach((key) => {
        expect(key).to.equal(toLowerCamelCase(key));
      });
    });
    it('should transform multiple kevalue responses into an array of objects', () => {
      const response = parseResponse(plchangesInitial);
      expect(response).to.have.lengthOf(10);
      response.forEach((obj) => {
        expect(obj).to.be.an('object');
        expect(Object.keys(obj)).to.have.length.above(0);
      });
    });
  });
});
