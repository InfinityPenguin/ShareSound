'use strict';

angular.module('shareSoundApp')
  .controller('UserCtrl', function ($scope, Auth, $location, $window) {
  	$scope.getCurrentUser = Auth.getCurrentUser;

  });
