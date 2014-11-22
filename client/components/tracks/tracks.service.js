'use strict';

angular.module('shareSoundApp')
  .factory('Tracks', function ($http) {
    // Service logic
    // ...

    var service = {}; 
    service.userTracks = []; 
    service.resultTracks = []; 
    service.query = "";

    service.getTracks = function(userId){
      return $http.get('/api/tracks/' + userId)
        .success(function (tracks){
            console.log("the tracks for user " + userId + " are " + JSON.stringify(tracks)); 
            service.userTracks = tracks; 
            return tracks; 
      });
    };

    service.getTracksByUsername = function(username){
      return $http.get('/api/tracks/getbyusername/' + username)
        .success(function (tracks){
            console.log("the tracks for user " + username + " are " + JSON.stringify(tracks)); 
            service.userTracks = tracks; 
            return tracks; 
      });
    };  
    
    service.addTags = function(id, tags){
      return $http.get('/api/tracks/tags/add/' + encodeURIComponent(id)  + '/' + encodeURIComponent(tags))
        .success(function (tracks){
            console.log("send add tags...");
      });
    };
    
    service.deleteTag = function(id, tag){
      return $http.get('/api/tracks/tags/delete/' + encodeURIComponent(id)  + '/' + encodeURIComponent(tag))
        .success(function (tracks){
            console.log("send remove tags..."); 

      });
    };
    
    
    service.searchTracks = function(query){
        return $http.get('/api/tracks/search/' + query)
        .success(function (tracks){
            
            console.log("the tracks for query " + query + " are " + JSON.stringify(tracks)); 
            service.resultTracks = tracks; 
            service.query = query; 
            return tracks; 
    });
    };
    return service;   
  }); 

/*
client/app/pokemonService/pokemonService.js
angular.module('pokemonAppApp')
  .factory('pokemonService', function ($http) {

    var service = {};

    service.allPokemons = [];
    service.currPokemon = {};

    service.getAllPokemons = function () {
      return $http.get('/api/pokemons')
        .success(function (pokemons) {
          service.allPokemons = pokemons;
          return pokemons;
        })
    };

    service.getPokemon = function (pokemonId) {
      return $http.get('/api/pokemons/' + pokemonId)
        .success(function (pokemon) {
          console.log(pokemon);
          service.currPokemon = pokemon;
        })
    };

    service.createPokemon = function (pokemonObj) {
      return $http.post('/api/pokemons', pokemonObj)
        .success(function (data) {
          service.allPokemons.push(data);
        })
    };

    service.deletePokemon = function (pokemonId) {
      return $http.delete('/api/pokemons/' + pokemonId)
        .success(function (data) {
          for (var i = 0, len = service.allPokemons.length; i < len; i++) {
            if (service.allPokemons[i]._id === pokemonId) {
              service.allPokemons.splice(i, 1);
            }
          }
          console.log('Success Deleting Pokemon');
        });
    };

    service.editPokemon = function (pokemonObj) {
      return $http.put('/api/pokemons', pokemonObj)
        .success(function (data) {
          console.log('Success Creating Pokemon');
        })
    };

    return service;
  }); */