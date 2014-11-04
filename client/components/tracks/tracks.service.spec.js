'use strict';

describe('Service: Tracks', function () {

  // load the service's module
  beforeEach(module('shareSoundApp'));

  // instantiate service
  var tracks;
  beforeEach(inject(function (_tracks_) {
    tracks = _tracks_;
  }));

  it('should do something', function () {
    expect(!!tracks).toBe(true);
  });

});
