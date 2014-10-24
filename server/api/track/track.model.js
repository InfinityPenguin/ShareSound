'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackSchema = new Schema({
  name: String,
  url: String,
  uploader_id: String
});

module.exports = mongoose.model('Track', TrackSchema);