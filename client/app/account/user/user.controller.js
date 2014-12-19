'use strict';
angular.module('shareSoundApp')
.controller('UserCtrl', function ($scope, $modal, Auth, projects, Tracks, $location, $window, $sce, $state, $stateParams) {
	//$scope.items = ['item1', 'item2', 'item3'];
	/*
	   $scope.cancel = function () {
	   $modalInstance.dismiss('cancel');
	   };
	   $scope.test = function() {
	   console.log($scope.info);
	   };
	   $scope.info = "";
	 */

	$scope.open = function (size) {
		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				deleteProject: function () {
					return $scope.deleteProject;
				}
			}
		});

		modalInstance.result.then(function (removed) {
			//$scope.tracksinit = removed;
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
			$state.transitionTo($state.current, $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		});
	};

	$scope.getCurrentUser = Auth.getCurrentUser;
	$scope.getToken = Auth.getToken; 
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.show = false;
	$scope.tracksinit = false;
	$scope.projectView = true;
	$scope.uploadTrackPage = false;
	$scope.createProjectPage = false;
	//$scope.deleteProjectPage = false;
	$scope.project = {};
	$scope.isOnUserPage = true; //allows the tag add/delete buttonns to not be displayed by search 
	$scope.projectError = false; // True if the "Project" field in the Create new project pop-up is blank when clicking "Create"
	// $scope.currentProject;
	$scope.projectservice = projects;

	$scope.deleteProject = {};
	//$scope.deleteAttemptName = "";

	/*
	   $scope.deleteMatch = function() {
	   return $scope.deleteProject.name == $scope.deleteAttemptName;
	   };
	 */

	$scope.$on('$destroy', function(event) {
		console.log("leaving page..."); 
		$scope.wavesurfers.map(function(ws) {
			if (!ws.backend.isPaused()){
				return ws.pause();    
			}
		});

	});
	$scope.showProjectView = function(){
		console.log("update");
		$location.path("/user");
	}
	$scope.deleteProjectPopUp = function(project){
		console.log("want to delete project" + JSON.stringify(project));
		//$scope.deleteProjectPage = true;
		$scope.deleteProject = project;
	}

	$scope.createProjectPopUp = function(){
		$scope.createProjectPage = true;
	}

	$scope.uploadTrack = function(){
		$scope.uploadTrackPage = true;
	}

	$scope.showAddTag = function(item){
		$scope.addTagPage = true;   
		$scope.itemToChange = item; 
	}

	$scope.Close = function(){
		$scope.uploadTrackPage = false;
		$scope.createProjectPage = false;
		$scope.deleteProjectPage = false;
		$scope.projectError = false;
		$scope.addTagPage = false; 
	}

	$scope.addProjectTag = function(){
		console.log("submitted project tags......"); 
		console.log($scope.project.tags); 

		projects.addTags($scope.itemToChange, $scope.project.tags); 
		$scope.showAddTag = false; 
		$state.transitionTo($state.current, $stateParams, {
			reload: true,
			inherit: false,
			notify: true
		});
	} 

	$scope.deleteProjectTag = function(id, tag){
		console.log("deleting " + tag + " for " + id); 
		projects.deleteTag(id, tag);
		$state.transitionTo($state.current, $stateParams, {
			reload: true,
			inherit: false,
			notify: true
		}); 
	}

	$scope.addTag = function(){
		console.log("submitted......"); 
		console.log($scope.track.tags); 

		Tracks.addTags($scope.itemToChange, $scope.track.tags); 
		$scope.showAddTag = false; 
		$state.transitionTo($state.current, $stateParams, {
			reload: true,
			inherit: false,
			notify: true
		});
	} 

	$scope.deleteTag = function(id, tag){
		console.log("deleting " + tag + " for " + id); 
		Tracks.deleteTag(id, tag);
		$state.transitionTo($state.current, $stateParams, {
			reload: true,
			inherit: false,
			notify: true
		}); 
	}


	$scope.submit = function() {
		$scope.submitted = true;

		console.log($scope.track.project)

			console.log($scope.track.tags)
			var tagArray = $scope.track.tags.split(" ")
			console.log("The tag array is : " + tagArray)
			$scope.tagArray = tagArray;
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

	$scope.s3_upload = function (){
		console.log("s3_upload");
		var status_elem = document.getElementById("status");
		//var url_elem = document.getElementById("avatar_url");
		// var preview_elem = document.getElementById("preview");

		var projectEncode = encodeURIComponent($scope.currentProject._id);
		//add tags and project 

		var tagEncode;
		var descriptionEncode;

		console.log("CURRENT USER: " + JSON.stringify(Auth.getCurrentUser().username));


		if ($scope.track !== undefined) {
			tagEncode = encodeURIComponent($scope.track.tags);
			if ($scope.track.description === undefined) {
				descriptionEncode = encodeURIComponent("No description"); 
			}
			else {
				descriptionEncode = encodeURIComponent($scope.track.description);
			}
		}
		else{
			tagEncode = encodeURIComponent(undefined);
			descriptionEncode = encodeURIComponent('No description');
		}
		console.log("The encoded tags is : " + tagEncode);
		console.log("The encoded project is : " + projectEncode); 

		var s3upload = new S3Upload({
			user: Auth.getCurrentUser(),
			file_dom_selector: 'files',
			s3_sign_put_url: '/api/tracks/uploadTrack/'+projectEncode+'/'+tagEncode+'/'+descriptionEncode,
			onProgress: function(percent, message) {
				status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
			},
			onFinishS3Put: function(public_url) {
				//status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
				//url_elem.value = public_url;
				//preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';

				console.log("reloading"); 

				$state.transitionTo($state.current, $stateParams, {
					reload: true,
					inherit: false,
					notify: true
				});
			},
			onError: function(status) {
				status_elem.innerHTML = 'Upload error: ' + status;
			}
		});
		$scope.uploadPage = false;
	}

	$scope.createProject = function(){
		$scope.user = {};
		$scope.errors = {};
		console.log(Auth.getCurrentUser());
		if ($scope.project.name === undefined){
			$scope.projectError = true;
			return;
		}

		$scope.projectError = false; 

		var tagList;
		if ($scope.project.tags === undefined){
			tagList = [];
		}
		else{
			tagList = $scope.project.tags.split(' ');
		}

		projects.createProject({
			owner: Auth.getCurrentUser()._id,
			name: $scope.project.name,
			description: $scope.project.description,
			tags: tagList
		}).then(function(){
			$scope.createProjectPage = false;
			var projectID = projects.newProjectID;
			$location.path("/user/" + projectID)
			projects.getProject(projectID);
		projects.getProjectTracks(projectID)
		})
		.catch( function(err) {
			err = err.data;
			$scope.errors = {};
			console.log(err);
			$scope.errors.username = err;
		});

	};

	$scope.viewProject = function(projectID){
		$location.path("/user/" + projectID)
			projects.getProject(projectID);
		projects.getProjectTracks(projectID)
	}


	Auth.isLoggedInAsync(function(response){ 
		// if(response){
		// 	console.log("is logged in!!!!!!!!");
		// 	console.log(Auth.getCurrentUser());
		// 	console.log(Auth.getCurrentUser()._id); 

		// Tracks.getTracks(Auth.getCurrentUser()._id)
		// .then( function() {
		// 	$scope.tracks = Tracks.userTracks;
		// 	console.log("tracks..... " + JSON.stringify($scope.tracks));
		// })
		// // if($stateParams.projectID){

		// // 	$scope.currentProject = projects.getProject($stateParams.projectID);
		// // 	console.log("name of project" +$scope.currentProject.name);
		// // }
		// }
		// else{
		// 	console.log("nope!!!!"); 
		// 	$location.path('login'); 
		// };
		if($stateParams.projectID!=undefined){
			console.log("not undefined")
				projects.getProject($stateParams.projectID).then(function(){
					// console.log("holy mother of god" +projects.currProjects)
					$scope.currentProject = projects.currProjects;

				})
			projects.getProjectTracks($stateParams.projectID)
		}

		projects.getUserProjects(Auth.getCurrentUser()._id)
			.then( function() {
				$scope.projects = projects.userProjects;

				// console.log("projects..... " + JSON.stringify($scope.projects));
			})

	});

	// $scope.findProjects = function(){

	// 	projects.getUserProjects(Auth.getCurrentUser()._id)
	// 	.then( function() {
	// 		$scope.projects = projects.userProjects;
	// 		console.log("projects..... " + JSON.stringify($scope.projects));
	// 	})


	// }



	$scope.doAll = function(action) {
		if (action == 'play') {
			$scope.wavesurfers.map(function(ws) {
				return ws.play();
			});
		};
		if (action == 'pause') {
			$scope.wavesurfers.map(function(ws) {
				return ws.pause();
			});
		};
		if (action == 'stop') {
			$scope.wavesurfers.map(function(ws) {
				return ws.stop();
			});
		};
	};
	// angular.element(document).ready(function() {
	$scope.showtracks = function() {
		if (!$scope.show){
			$scope.show = true;
			$scope.showplayall = true;
			if (!$scope.tracksinit){
				var waveColors = ['#66CCFF', '#66FF66', '#FF9933', 'violet'];
				var progressColors = ['#0033CC', '#009900', '#FF6600', 'purple'];
				var color = 0; // for selecting the color
				$scope.tracksinit = true;
				$scope.wavesurfers = [].map.call(document.querySelectorAll(".track_list li .wavesurfers"), function(element) {
					//console.log(element);
					var trackurl = element.getElementsByClassName("url")[0].textContent;
					//console.log(element.getElementsByClassName("url")[0]);
					var trackid = element.getElementsByClassName("waveform")[0].getAttribute("id");
					//console.log("url: " + trackurl);
					//console.log("trackid: " + trackid);
					// Create an instance
					var wavesurfer = Object.create(WaveSurfer);
					console.log("made wavesurfer");

					// Init & load audio file
					var qstring = '#waveform'
					console.log("q: "+qstring);
					var options = {
						container     : element,
						waveColor     : waveColors[color % 4],
						progressColor : progressColors[color % 4],
						loaderColor   : 'red',
						cursorColor   : 'red',
						normalize: true,
						height: 64
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
					var controlele = document.getElementById('controlling:' + trackid);
					[].forEach.call(controlele.querySelectorAll('[data-action]'), function (el) {
						el.addEventListener('click', function (e) {
							//console.log("CLICKING", e);
							//console.log(e);
							var action = e.currentTarget.dataset.action;
							if (action in GLOBAL_ACTIONS) {
								e.preventDefault();
								GLOBAL_ACTIONS[action](e);
							}
						});
					});
					color++;
					return wavesurfer;	
				});
				
			};
		} else {
			$scope.show = false;
			$scope.showplayall = false;
		}
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
angular.module('shareSoundApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, Auth, $location, deleteProject, projects) {
	/*$scope.items = items;
	  $scope.selected = {
	  item: $scope.items[0]
	  };

	  $scope.ok = function () {
	  $modalInstance.close($scope.selected.item);
	  };
	 */
	$scope.deleteProject = deleteProject;
	$scope.attempt = {};
	$scope.deleteMatch = function() {
		return $scope.deleteProject.name == $scope.attempt.name;
	};
	$scope.test = function() {
		//console.log($scope.deleteProject);
		//console.log($scope.attempt.name);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.removeProject = function(projectID){
		console.log('deleteProject yeee');
		projects.deleteProject(projectID)
			.then(function(){
				projects.getUserProjects(Auth.getCurrentUser()._id)
				.then( function() {
					$scope.projects = projects.userProjects;
				})
			//$scope.deleteProjectPage = false;
			});
			$modalInstance.dismiss('cancel');
			//console.log("location switch");
			//$location.path("/user");
	}
});
