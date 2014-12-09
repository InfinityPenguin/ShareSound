'use strict';

angular.module('shareSoundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project',
        templateUrl: '../account/project/project.html',
        controller: 'ProjectCtrl'
      });
  });