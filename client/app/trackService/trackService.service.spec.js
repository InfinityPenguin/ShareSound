'use strict';

describe('Service: trackService', function () {

  // load the service's module
  beforeEach(module('shareSoundApp'));

  // instantiate service
  var trackService;
  beforeEach(inject(function (_trackService_) {
    trackService = _trackService_;
  }));

  it('should do something', function () {
    expect(!!trackService).toBe(true);
  });

});
