'use strict';

angular.module('shareSoundApp')
  .controller('UserCtrl', function ($scope, Auth, Tracks, $location, $window) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getToken = Auth.getToken; 
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    

    Auth.isLoggedInAsync(function(response){
       if(response){
        console.log("is logged in!!!!!!!!");
        console.log(Auth.getCurrentUser());
        console.log(Auth.getCurrentUser()._id); 

        Tracks.getTracks(Auth.getCurrentUser()._id)
        .then( function() {
        $scope.tracks = Tracks.userTracks; 
        console.log("tracks..... " + JSON.stringify($scope.tracks)); 
        })
       }
       // else{
       //     console.log("nope!!!!"); 
       //     $location.path('login'); 
       // }
        
        
    });

  });



/*

client/app/pokedex/pokedex.controller.js
angular.module('pokemonAppApp')
  .controller('PokedexCtrl', function ($scope, pokemonService, $location) {
  	$scope.pokemonService = pokemonService;
  	pokemonService.getAllPokemons();

  	$scope.viewPokemon = function (pokemon) {
  		pokemonService.getPokemon(pokemon._id);
  		$location.path('/' + pokemon._id);
  	};

  	$scope.deletePokemon = function () {
  		pokemonService.deletePokemon(pokemonService.currPokemon._id);
  		$location.path('/');
  	};


  	$scope.newPokemon = { name: '', picture: '', description: '' };

  	$scope.addPokemon = function () {
  		pokemonService.createPokemon($scope.newPokemon);
$scope.newPokemon = { name: '', picture: '', description: '' };
  	}
  });


*/