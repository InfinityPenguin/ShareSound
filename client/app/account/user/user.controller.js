'use strict';

angular.module('shareSoundApp')
  .controller('UserCtrl', function ($scope, Auth, Tracks, $location, $window, $sce) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getToken = Auth.getToken; 
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    Auth.isLoggedInAsync(function(response){
       if(response){
        console.log("is logged in!!!!!!!!");
        Tracks.getTracks(Auth.getCurrentUser()._id)
        .then( function() {
            
        $scope.tracks = Tracks.userTracks; 
        angular.forEach($scope.tracks, function(value, key){
            $scope.tracks[key].url = $sce.trustAsResourceUrl($scope.tracks[key].url); 
        }); 
            
        
        /*function loadTracks(){
            angular.forEach($scope.tracks, function(value, key) {
                var wavesurfer = Object.create(WaveSurfer);
                console.log("loading script.........here!"); 

            // Init & load audio file

                var options = {
                        container     : document.querySelector('#waveform' + key),
                        waveColor     : 'violet',
                        progressColor : 'purple',
                        loaderColor   : 'purple',
                        cursorColor   : 'navy'
                };


                // Init
                wavesurfer.init(options);
                // Load audio from URL
                console.log("LOADING AUDIO FILE!"); 
                wavesurfer.load('assets/audio/Says.mp3');


                // Play at once when ready
                // Won't work on iOS until you touch the page
                wavesurfer.on('ready', function () {
                    console.log("playing...."); 
                    wavesurfer.play();
                });

                // Report errors
                wavesurfer.on('error', function (err) {
                    console.error(err);
                });

                // Do something when the clip is over
                wavesurfer.on('finish', function () {
                    console.log('Finished playing');
                });

                var progressDiv = document.querySelector('#progress-bar');
                var progressBar = progressDiv.querySelector('.progress-bar');

                var showProgress = function (percent) {
                    progressDiv.style.display = 'block';
                    progressBar.style.width = percent + '%';
                };

                var hideProgress = function () {
                    progressDiv.style.display = 'none';
                };

                wavesurfer.on('loading', showProgress);
                wavesurfer.on('ready', hideProgress);
                wavesurfer.on('destroy', hideProgress);
                wavesurfer.on('error', hideProgress);

                }); //end of foreach 
            }
             $scope.loadTracks = loadTracks;  */
                
            }); //end of if 
        
        
       
            
            
            
            
        }
       else{
           console.log("nope!!!!"); 
           $location.path('login'); 
       }
        
        
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