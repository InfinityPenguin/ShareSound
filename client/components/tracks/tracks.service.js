'use strict';

angular.module('shareSoundApp')
  .factory('Tracks', function ($http) {
    // Service logic
    // ...

    var service = {}; 
    service.userTracks = []; 

    service.getTracks = function(userId){
      return $http.get('/api/tracks/' + userId)
        .success(function (tracks){
            service.userTracks = tracks; 
            return tracks; 
      })
        
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