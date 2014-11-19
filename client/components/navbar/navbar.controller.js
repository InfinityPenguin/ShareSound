'use strict';

angular.module('shareSoundApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Tracks) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    
    $scope.search = function(){
      console.log("SEARCHINGGGG"); 
      console.log($scope.query); 
      Tracks.searchTracks($scope.query)
      .then( function() {
			$scope.searchResults = Tracks.resultTracks; 
			console.log("found tracks..... " + JSON.stringify($scope.searchResults));
		})
    
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.showUser = function(){
      $location.path('/user');
    }
  });