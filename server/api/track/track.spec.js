'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');
var Track = require('./track.model');

describe('GET /api/tracks', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/tracks')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('.isValidTrack', function () {
  it('should return false for these shitty arguments', function (done) {
    assert.equal(Track.isValidTrack(''), false);
    assert.equal(Track.isValidTrack('.ralph'), false);
    assert.equal(Track.isValidTrack('mp3'), false);
    assert.equal(Track.isValidTrack('wav'), false);
    assert.equal(Track.isValidTrack('ogg'), false);
    assert.equal(Track.isValidTrack('.mp4'), false);
    assert.equal(Track.isValidTrack('ISAI.mp4'), false);
    done();
  });

  it('should return true for these fucking amazing arguments', function (done) {
    assert.equal(Track.isValidTrack('aidan.wav'), true);
    assert.equal(Track.isValidTrack('ralphisactuallythe.ogg'), true);
    assert.equal(Track.isValidTrack('.wav'), true);
    assert.equal(Track.isValidTrack('.ogg'), true);
    assert.equal(Track.isValidTrack('.mp3'), true);
    assert.equal(Track.isValidTrack('happy.feet.mp3'), true);
    done();
  });
});

