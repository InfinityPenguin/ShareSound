'use strict';

angular.module('shareSoundApp')
  .factory('trackService', function ($http, User, Auth) {
    // Service logic
    // ...

    var service = {};
    var currentUser = {};
    service.curTracks = [];
    // if($cookieStore.get('token')) {
    //   currentUser = User.get();
    // }
    currentUser = Auth.getCurrentUser();

    service.getCurTracks = function() {
      return $http.get('/api/tracks')
        .success(function(tracks) {
          service.curTracks = tracks;
          return tracks;
        });
    };
    return service;
  });
