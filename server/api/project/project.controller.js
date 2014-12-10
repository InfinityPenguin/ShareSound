'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var User = require('../user/user.model');
var Track = require('../track/track.model');


// Get list of projects
exports.index = function(req, res) {
  Project.find(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.json(201, project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.getUserProjects = function(req, res){
  console.log("getting projects for ..... " + req.params.id); 
  Project.find({owner : req.params.id}, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }

    console.log("Found projects: " + JSON.stringify(project));     
    return res.json(project);
  });
};

exports.getUserProjectsByUsername = function(req, res){
  console.log("getting projects by name for ..... " + req.params.username); 
  User.findOne({username : req.params.username}, function(err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404, {error: "No such user"}); }
    var userid = user._id
    Project.find({owner : userid}, function (err, project) {
      if(err) { return handleError(res, err); }
      if(!project) { return res.send(404); }
      console.log("Found projects: " + JSON.stringify(project));     
      return res.json(project);
    });
  });
};

exports.search = function(req, res){
  console.log("searching projects for .... " + req.params.tags); 
    Track.find({tags : req.params.tags}, function (err, project){
       if(err) { return handleError(res, err);}
       if(!project) { return res.send(404); }

    console.log("Found projects: " + JSON.stringify(project));     
    return res.json(project);
        
    });
};
// // Creates a new project in the DB. 
// exports.create = function(req, res, callback) {
//   var userId = req.query.user;
//   var name = req.query.name;
//   var tags = decodeURIComponent(req.params.tags);
//   // var project = decodeURIComponent(req.params.project);
    
//   User.findById(userId, function(err, user) {
//     if (!user) {
//       console.log('UserId ' + userId + ' doesn\'t exist.');
//       uploadTrackID = null;
//       callback();
//       return;
//     }
//     if (!Project.isValidProject(name)) { 
//       console.log("Invalid project name.");
//       uploadTrackID = null;
//       callback();
//       return;
//     } else {
//       req.body = { 
//         name: name,
//         uploader_id: userId,
//                 tags: tags.split(" "),
//                 project : project 
//       };
//       console.log('Created track for user: ' + userId);
//       Track.create(req.body, function(err, track) {
//         uploadTrackID = track._id.toString();
//         req.body.url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+track._id;
//         //console.log('req body: ' + JSON.stringify(req.body));

//         Track.findById(uploadTrackID, function(err, track) {
//           var updated = _.merge(track, req.body);
//           console.log('updated: ' + JSON.stringify(updated));
//           updated.save(function (err) { });
//           callback();
//           return;
//         });
//       });
//     }
//   });
// };




function handleError(res, err) {
  return res.send(500, err);
}