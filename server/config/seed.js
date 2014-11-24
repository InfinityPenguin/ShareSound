/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Track = require('../api/track/track.model');
var Project = require('../api/project/project.model');

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
    var testproject = new Project({
        name: "test project",
        owner: "444444444444444444444444",
        tags: ["test", "project"],
        description: 'This is description of test project'
    })
    testproject.save();
    Track.create({

        name: "Wareru9",
        // url: "http://helenhan.me/Prefontaine.mp3",
        url: 'https://sharesound.s3.amazonaws.com/wareru9.mp3',
        uploader_id: "444444444444444444444444", 
        description: "The sound of glass breaking",
        tags: ["sound", "effects", "dramatic"],
        _id : mongoose.Types.ObjectId("DDDDDDDDDDDD"),
        project_id : testproject._id
        
        
    }, {
        name: "Wind Dark",
        // url: "https://dl-web.dropbox.com/get/tracks%20example/Endlos.mp3?_subject_uid=106468574&w=AADQGY5UDoqKKDUwZlds_OJbbtrZ6bMeItcLqaA9tiMxTQ",
        url: 'https://sharesound.s3.amazonaws.com/wind_dark.mp3',
        uploader_id: "444444444444444444444444",
        description: "A gust of wind",
        tags: ["sound", "effects", "scary"]
    },
    {
        name: "Horror Gyaku",
        // url: "https://dl-web.dropbox.com/get/tracks%20example/Endlos.mp3?_subject_uid=106468574&w=AADQGY5UDoqKKDUwZlds_OJbbtrZ6bMeItcLqaA9tiMxTQ",
        url: 'https://sharesound.s3.amazonaws.com/horror2_gyaku3.wav',
        uploader_id: "444444444444444444444444",
        description: "Something scary is about to happen.......",
        tags: ["sound", "effects", "horror", "suspense"]
    },
    {
        name: "Lost Chair",
        // url: "https://dl-web.dropbox.com/get/tracks%20example/Endlos.mp3?_subject_uid=106468574&w=AADQGY5UDoqKKDUwZlds_OJbbtrZ6bMeItcLqaA9tiMxTQ",
        url: 'https://sharesound.s3.amazonaws.com/Lost_Chair.mp3',
        uploader_id: "444444444444444444444444",
        description: "The sadness of a lost chair",
        tags: ["sad", "nostalgic"]
    },
     {
        name: "Rumor",
        // url: "https://dl-web.dropbox.com/get/tracks%20example/Endlos.mp3?_subject_uid=106468574&w=AADQGY5UDoqKKDUwZlds_OJbbtrZ6bMeItcLqaA9tiMxTQ",
        url: 'https://sharesound.s3.amazonaws.com/Rumor.ogg',
        uploader_id: "444444444444444444444444",
        description: "Sounds like guitar kinda",
        tags: ["guitar", "sad"]
    }
       
            
                
                
    );
});
