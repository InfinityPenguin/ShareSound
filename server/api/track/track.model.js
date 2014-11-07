'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TrackSchema = new Schema({
	name: String,
	url: String,
	uploader_id: String
});

TrackSchema.statics.isValidTrack = function (name, callback) {
	var extension = name.split('.').pop();
	return ((name.indexOf('.') !== -1) && (extension === 'mp3' || extension === 'wav' || extension === 'ogg'));
};


module.exports = mongoose.model('Track', TrackSchema);
