'use strict';

angular.module('shareSoundApp')
  .factory('projects', function ($http) {
    // Service logic
    // ...

    // Public API here
    var service = {}; 
    service.userProjects = []; 
    service.currProjects = {}; 
    service.query = "";

    service.createProject = function (projectObj) {
      return $http.post('/api/projects', projectObj)
        .success(function (data) {
          service.userProjects.push(data);
        })
    };

    service.getUserProjects = function(userId){
      console.log("getting projects") 

      return $http.get('/api/projects/user/' + userId)
        .success(function (projects){
            console.log("the projects for user " + userId + " are " + JSON.stringify(projects)); 
            service.userProjects = projects; 
            return projects; 
      });
    };


    return service;   
  });
