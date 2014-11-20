'use strict';

angular.module('shareSoundApp')
  .controller('SearchCtrl', function ($scope, Tracks, $state, $stateParams) {
    $scope.message = 'Hello';
    $scope.tracks = Tracks.resultTracks; 
    $scope.query = Tracks.query; 
   
    console.log("search knows: " + JSON.stringify($scope.tracks)); 
    
    $scope.showtracks = function() {
		if (!$scope.show){
			$scope.show = true;
			if (!$scope.tracksinit){

				$scope.tracksinit = true;
				$scope.wavesurfers = [].map.call(document.querySelectorAll(".track_list li .wavesurfers"), function(element) {
					console.log(element);
					var trackurl = element.getElementsByClassName("url")[0].textContent;
					console.log(element.getElementsByClassName("url")[0]);
					var trackid = element.getElementsByClassName("controls")[0].getAttribute("id");
					console.log("url: " + trackurl);
					console.log("trackid: " + trackid);
					// Create an instance
					var wavesurfer = Object.create(WaveSurfer);
					console.log("made wavesurfer");

					// Init & load audio file
					var qstring = '#waveform'
					console.log("q: "+qstring);
				var options = {
					container     : element,
					waveColor     : 'silver',
					progressColor : 'gold',
					loaderColor   : 'gold',
					cursorColor   : 'red',
                    normalize: true,
                    height: 100
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
				// wavesurfer.load('/assets/media/samp.mp3');
				wavesurfer.load(trackurl);
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
				var controlselstr = trackid;
				console.log("selstr: " + controlselstr);
				var controlele = document.getElementById(controlselstr);
				[].forEach.call(controlele.querySelectorAll('[data-action]'), function (el) {
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
			};
		} else {
			$scope.show = false;
		}
    };
    
    $scope.searchTag = function(query){
      console.log("SEARCHINGGGG"); 
      console.log(query); 
      Tracks.searchTracks(query)
      .then( function() {
			$scope.searchResults = Tracks.resultTracks; 
			console.log("found tracks..... " + JSON.stringify($scope.searchResults));
            //$location.path('search'); 
            //this is better than location.path because refresh page if current page 
            $state.transitionTo('search' , $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
		})
    
    };
  });
