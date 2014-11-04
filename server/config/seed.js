/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Track = require('../api/track/track.model');
var mongoose = require('mongoose');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  var newUser = new User({username: "test", password: "123123"});
  var id = mongoose.Types.ObjectId("DDDDDDDDDDDD");
  newUser._id = id; 
  newUser.save(function(err, user){

  }); 
});

Track.find({}).remove(function() {
    Track.create({
        name: "Berlin - Moderat",
        url: "https://dl-web.dropbox.com/get/tracks%20example/11%20Berlin.mp3?_subject_uid=106468574&w=AACfnwTzmBzLtNExQLcqSizfKJ_jrwZwam7KwXYhIhLlAg",
        uploader_id: "444444444444444444444444", 
    }, {
        name: "Endlos - Kollektiv Turmstrasse",
        url: "https://dl-web.dropbox.com/get/tracks%20example/Endlos.mp3?_subject_uid=106468574&w=AADQGY5UDoqKKDUwZlds_OJbbtrZ6bMeItcLqaA9tiMxTQ",
        uploader_id: "444444444444444444444444"
    }
                
                
    );
});