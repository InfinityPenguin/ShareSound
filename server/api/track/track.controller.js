'use strict';

var _ = require('lodash');
var Track = require('./track.model');

var AWS = require('aws-sdk');
var AWS_ACCESS_KEY = 'AKIAIRC5AYLZSGHPWSUQ';
var AWS_SECRET_KEY = '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';
AWS.config.region = 'us-west-1';
AWS.config.accessKeyId =  'AKIAIRC5AYLZSGHPWSUQ';
AWS.config.secretAccessKey = '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';
var S3_BUCKET = 'sharesound';

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

// Creates a new track in the DB.
exports.create = function(req, res) {
  Track.create(req.body, function(err, track) {
    if(err) { return handleError(res, err); }
    return res.json(201, track);
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

exports.test = function(req, res) {
  
  var s3 = require('s3');

  var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: "AKIAIRC5AYLZSGHPWSUQ",
      secretAccessKey: "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",
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
  });

  client.getFile('sharesound/message.txt', function(err, imageStream) {
        imageStream.pipe(res);
  });
  
  var params = {
    localFile: "./message.txt",

    s3Params: {
      Bucket: "sharesound",
      Key: "test.txt",
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  };
  /*
  // UPLOADING
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  }); 
  
  var params = {
    localFile: "download.wma",

    s3Params: {
      Bucket: "sharesound",
      Key: "prelude_in_c.wma",
      // other options supported by getObject
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
    },
  };*/

  // DOWNLOADING
  var downloader = client.downloadFile(params);
  downloader.on('error', function(err) {
    console.error("unable to download:", err.stack);
  });
  downloader.on('progress', function() {
    console.log("progress", downloader.progressAmount, downloader.progressTotal);
  });
  downloader.on('end', function() {
    console.log("done downloading");
  });
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-1';

  /*
  var s3 = new AWS.S3();
  s3.listBuckets(function(err, data) {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  });
*/
};

exports.download = function(req, res) {


  var s3 = new AWS.S3();

  res.setHeader('Content-disposition', 'attachment; filename=track.wma');

  var params = {Bucket: 'sharesound', Key: 'prelude_in_c.wma'};
  // var file = require('fs').createWriteStream('./download_test_file.wma');
  s3.getObject(params)
   .createReadStream().pipe(res);
};


exports.generateSignedURL = function(req, res) {
    AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new AWS.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'bucket-owner-full-control'
    };

    console.log(s3_params.Key)

    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
};

exports.upload = function(req, res) {
  var file = req.files.toUpload;
  var options = {
  }
}

exports.dummy = function(req, res) {
  console.log('hellooooooooooo~~~~~~~~~~');
  return res.json(200, {message: "DO U FUX WIDIT?!"});
};

function handleError(res, err) {
  return res.send(500, err);
}