'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var ERR_USER_EXISTS = -1; 
var ERR_BAD_USERNAME = -2;
var ERR_BAD_PASSWORD = -3; 
var ERR_NO_USER = -1; 
var ERR_BAD_CREDENTIALS = -2; 
var ERR_MISC = -1;
var SUCCESS = 1; 

var validationError = function(res, err) {
    var errmsg = String(err); 
    var code = ERR_MISC; 
    if (errmsg.indexOf("Username cannot be blank") > -1){
        code = ERR_BAD_USERNAME; 
    }
    else if (errmsg.indexOf("The specified username is already in use") > -1 ){
        code = ERR_USER_EXISTS;    
    }
    else if (errmsg.indexOf("Password must be between 5 and 39 characters") > -1){
        code = ERR_BAD_PASSWORD; 
    }
    else if (errmsg.indexOf("Username must be letters, numbers, underscores, or dashes") > -1){
        code = ERR_BAD_USERNAME;    
    }
    
    err['status code'] = code;
    return res.json(422, err);
    // return res.json({"status code" : code}); 
    
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    console.log("ERROR : " + err); 
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    //res.json({ token: token });
    res.json({"status code": SUCCESS, token: token}); 
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};*/

/**
 * Change a users password
 
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
}; */

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
