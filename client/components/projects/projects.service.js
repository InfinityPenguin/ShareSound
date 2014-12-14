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
    service.newProjectID = "";

    service.createProject = function (projectObj) {
      return $http.post('/api/projects', projectObj)
        .success(function (data) {
          service.userProjects.push(data);
          console.log(data._id);
          service.newProjectID = data._id;
          return data._id;
        })
    };

    service.deleteProject = function(projectId){
      return $http.delete('/api/projects/'+projectId)
        .success(function(data){
          
          // service.userProjects.remove(data);
        });

    };
    
    service.addTags = function(id, tags){
      return $http.get('/api/projects/tags/add/' + encodeURIComponent(id)  + '/' + encodeURIComponent(tags))
        .success(function (tracks){
            console.log("send add tags...");
      });
    };
    
    service.deleteTag = function(id, tag){
      return $http.get('/api/projects/tags/delete/' + encodeURIComponent(id)  + '/' + encodeURIComponent(tag))
        .success(function (tracks){
            console.log("send remove tags..."); 

      });
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
