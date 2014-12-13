'use strict';

var _ = require('lodash');
var Track = require('./track.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var AWS = require('aws-sdk');
AWS.config.region = 'us-west-1';
var S3_BUCKET = 'sharesound';

var FAILURE = -1;
var SUCCESS = 1;
var uploadTrackID = "";

// Get list of tracks
exports.index = function(req, res) {
	Track.find(function (err, tracks) {
		if(err) { return handleError(res, err); }
		return res.json(200, tracks);
	});
};

// Get a single track
exports.show = function(req, res) {
	Track.findById(req.params.id, function (err, track) {
		if(err) { return handleError(res, err); }
		if(!track) { return res.send(404); }
		return res.json(track);
	});
};

// Updates an existing track in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Track.findById(req.params.id, function (err, track) {
		if (err) { return handleError(res, err); }
		if(!track) { return res.send(404); }
		var updated = _.merge(track, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, track);
		});
	});
};

// Deletes a track from the DB.
exports.destroy = function(req, res) {
	Track.findById(req.params.id, function (err, track) {
		if(err) { return handleError(res, err); }
		if(!track) { return res.send(404); }
		track.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

exports.getProjectTracks = function(req, res){
    console.log("getting tracks for ..... " + req.params.id); 
	Track.find({project_id : req.params.id}, function (err, track) {
		if(err) { return handleError(res, err); }
		if(!track) { return res.send(404); }

		console.log("Found tracks: " + JSON.stringify(track));     
		return res.json(track);
	});
    
}; 

exports.getUserTracks = function(req, res){
	console.log("getting tracks for ..... " + req.params.id); 
	Track.find({uploader_id : req.params.id}, function (err, track) {
		if(err) { return handleError(res, err); }
		if(!track) { return res.send(404); }

		console.log("Found tracks: " + JSON.stringify(track));     
		return res.json(track);
	});
}; 

exports.getTracksByUsername = function(req, res){
	console.log("getting tracks for ..... " + req.params.username); 
	User.findOne({username : req.params.username}, function(err, user) {
		if(err) { return handleError(res, err); }
		if(!user) { return res.send(404); }
		var userid = user._id
		Track.find({uploader_id : userid}, function (err, track) {
			if(err) { return handleError(res, err); }
			if(!track) { return res.send(404); }
			console.log("Found tracks: " + JSON.stringify(track));     
			return res.json(track);
		});
	});
}; 

exports.search = function(req, res){
  var tagArray = req.params.tags.split(" "); 
  console.log("searching tracks for .... " + req.params.tags); 
    //( { field : { $in : array } } )
    Track.find({tags : { $all: tagArray}}, function (err, track){
       if(err) { return handleError(res, err);}
       if(!track) { return res.send(404); }

		console.log("Found tracks: " + JSON.stringify(track));     
		return res.json(track);
        
    });
};
 
exports.addTags = function(req, res){
  var tagArray = req.params.tags.split(" "); 
  var trackToChange = req.params.id; 
    
  console.log("adding tags " + req.params.tags + " for " + trackToChange); 
  tagArray.forEach(function(tag){
      Track.update({_id: trackToChange},{$addToSet: {tags:tag}},{upsert:false},function(err){
        if(err){
                console.log(err);
        }else{
                console.log("Successfully added");
                return res.json(tagArray); 
        }
      });
  })
};

exports.deleteTag = function(req, res){
  var tag = decodeURIComponent(req.params.tag);  
  var trackToChange = decodeURIComponent(req.params.id); 
  console.log("DELETING......"+tag);     
    
    
  Track.update(
  { _id: trackToChange },
  { $pull: {tags: tag } },
      function(err){
        if(err){
                console.log(err);
        }else{
                console.log("Removed");
                return res.json(tag); 
        }
          
      }); 
};


exports.download = function(req, res) {
	var s3 = new AWS.S3();

	res.setHeader('Content-disposition', 'attachment; filename=track.wma');

	var params = {Bucket: 'sharesound', Key: 'prelude_in_c.wma'};
	// var file = require('fs').createWriteStream('./download_test_file.wma');
	s3.getObject(params)
		.createReadStream().pipe(res);
};

// Creates a new track in the DB. Sets uploadTrackID to null if the request is not valid.
exports.create = function(req, res, callback) {
	var userId = req.query.user;
	var name = req.query.s3_object_name;
    //var name = decodeURIComponent(req.params.name); 
    var tags = decodeURIComponent(req.params.tags);
    var project_id = decodeURIComponent(req.params.project_id);
    var description = decodeURIComponent(req.params.description); 
    
	User.findById(userId, function(err, user) {
		if (!user) {
			console.log('UserId ' + userId + ' doesn\'t exist.');
			uploadTrackID = null;
			callback();
			return;
		}
		if (!Track.isValidTrack(name)) { 
			console.log("Invalid track name.");
			uploadTrackID = null;
			callback();
			return;
		} else {
			req.body = { 
				name: name,
				uploader_id: userId,
                project_id : project_id,
                description: description
			};
			if (tags === 'undefined'){
				req.body.tags = [];
			}
			else {
				req.body.tags = tags.split(' ');
			}
			console.log('Created track for user: ' + userId);
			Track.create(req.body, function(err, track) {
				uploadTrackID = track._id.toString();
				req.body.url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+track._id;
				//console.log('req body: ' + JSON.stringify(req.body));

				Track.findById(uploadTrackID, function(err, track) {
					var updated = _.merge(track, req.body);
					console.log('updated: ' + JSON.stringify(updated));
					updated.save(function (err) { });
					callback();
					return;
				});
			});
		}
	});
};

/* Returns a signed url back to the client to upload with. Calls exports.create and expects it to handle invalid track upload requests. Returns an error if exports.create returns null */
exports.getUploadURL = function(req, res) {
	console.log('getUploadURL with query: ' + JSON.stringify(req.query));
 
  
 
    
	var trackId;
	exports.create(req, res, function() {
		trackId = uploadTrackID;
		if (trackId === null) { 
			console.log('Invalid track upload request.'); 
			return res.json(400, {'status code': FAILURE});
		}

		AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY});
		var s3 = new AWS.S3();
		var s3_params = {
			Bucket: S3_BUCKET,
		Key: trackId,
		Expires: 9001,
		ContentType: req.query.s3_object_type,
		ACL: 'public-read-write'
		};

		s3.getSignedUrl('putObject', s3_params, function(err, data){
			if(err){ console.log(err); }
			else{
				var return_data = {
					signed_request: data,
			url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+s3_params.Key
				};
				res.write(JSON.stringify(return_data));
				res.end();
			}
		});
	});
};

exports.foo = function(req, res) {
	console.log("FOOOOO");
	console.log(JSON.stringify(req.query));
};

function handleError(res, err) {
	return res.send(500, err);
}
