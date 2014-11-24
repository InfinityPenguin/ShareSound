'use strict';

angular.module('shareSoundApp')
  .factory('projects', function ($http) {
    // Service logic
    // ...

    // Public API here
    var service = {}; 
    service.userProjects = []; 

    service.currProjects = {};
    service.currProjectTracks = [];
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

    service.getProject = function(projectId){

      return $http.get('/api/projects/' + projectId)
      .success(function(project){
        console.log("current project is " +JSON.stringify(project));
        service.currProjects = project;
        return project;
      });
    };

    service.getProjectTracks = function(projectId){

      return $http.get('/api/tracks/project/' + projectId)
      .success(function(tracks){
        console.log("current tracks are: " +JSON.stringify(tracks));
        service.currProjectTracks = tracks;
        return tracks;
      });
    };

    return service;   
  });
