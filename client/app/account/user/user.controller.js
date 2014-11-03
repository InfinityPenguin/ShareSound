'use strict';

angular.module('shareSoundApp')
  .controller('UserCtrl', function ($scope, Auth, $location, $window) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getToken = Auth.getToken; 
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    if (Auth.getToken()){
        console.log("Is logged in!");
     
    }
    else{
        console.log("nope!!!!"); 
         $location.path('login');
    }

  });
