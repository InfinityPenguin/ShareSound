'use strict';
angular.module('shareSoundApp')
.controller('UserCtrl', function ($scope, Auth, Tracks, $location, $window, $sce) {
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
  else{
   console.log("nope!!!!"); 
   $location.path('login'); 
    };
  });

// $scope.playAll = function() {
//   var songs = 
// }
 // angular.element(document).ready(function() {
$scope.showtracks = function() {

  var wavesurfers = [].map.call(document.querySelectorAll(".track_list li"), function(element) {
    console.log(element);
    var trackurl = element.getElementsByClassName("url")[0].textContent;
    console.log("url: " + trackurl);
     // Create an instance
    var wavesurfer = Object.create(WaveSurfer);
    console.log("made wavesurfer");

     // Init & load audio file
     var qstring = '#waveform'
     console.log("q: "+qstring);
    var options = {
       container     : element,
       waveColor     : 'violet',
       progressColor : 'purple',
       loaderColor   : 'purple',
       cursorColor   : 'navy'
     };

     if (location.search.match('scroll')) {
       options.minPxPerSec = 100;
       options.scrollParent = true;
     };

     if (location.search.match('normalize')) {
       options.normalize = true;
     };

         // Init
    wavesurfer.init(options);
         // Load audio from URL
    wavesurfer.load('/assets/media/samp.mp3');
    // wavesurfer.load("helenhan.me/Prefontaine.mp3");
         // Regions
    if (wavesurfer.enableDragSelection) {
           wavesurfer.enableDragSelection({
             color: 'rgba(0, 255, 0, 0.1)'
           });
         }
     // Play at once when ready
     // Won't work on iOS until you touch the page
     wavesurfer.on('ready', function () {
       //wavesurfer.play();
     });

     // Report errors
     wavesurfer.on('error', function (err) {
       console.error(err);
     });

     // Do something when the clip is over
     wavesurfer.on('finish', function () {
       console.log('Finished playing');
     });
     var GLOBAL_ACTIONS = {
         'play': function () {
             wavesurfer.playPause();
         },

         'back': function () {
             wavesurfer.skipBackward();
         },

         'forth': function () {
             wavesurfer.skipForward();
         },

         'toggle-mute': function () {
             wavesurfer.toggleMute();
         }
     };
     [].forEach.call(document.querySelectorAll('[data-action]'), function (el) {
         el.addEventListener('click', function (e) {
             var action = e.currentTarget.dataset.action;
             if (action in GLOBAL_ACTIONS) {
                 e.preventDefault();
                 GLOBAL_ACTIONS[action](e);
             }
         });
     });
     return wavesurfer;
  });
  // angular.forEach($scope.tracks, function(track, key) {

       // });
    // });

}
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