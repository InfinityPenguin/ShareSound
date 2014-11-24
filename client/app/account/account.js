'use strict';

angular.module('shareSoundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('user', {
        url: '/user',
        templateUrl: 'app/account/user/user.html',
        controller: 'UserCtrl',
        authenticate: true,
      })
      .state('project', {
        url: '/user/:projectID',
        templateUrl: 'app/account/user/templates/user.project.html',
        controller: 'UserCtrl',
        authenticate: true,
      })
      .state('profileview', {
        url: '/profile/:username',
        templateUrl: 'app/account/profileview/profileview.html',
        controller: 'ProfileviewCtrl',
      })
      .state('profileprojectview', {
        url: '/profile/:username/:projectID',
        templateUrl: 'app/account/user/templates/user.project.html',
        controller: 'ProfileviewCtrl',
      });
  });
