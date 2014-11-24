'use strict';

var express = require('express');
var controller = require('./track.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/uploadTrack/:tags/:project_id/:description', controller.getUploadURL);
router.get('/uploadTrack', controller.getUploadURL); 
router.post('/deleteTrack', controller.destroy);
router.post('/downloadTrack', controller.download);
router.get('/foo', controller.foo);

router.get('/search/:tags', controller.search); 
router.get('/tags/add/:id/:tags', controller.addTags); 
router.get('/tags/delete/:id/:tag', controller.deleteTag); 

router.get('/project/:id', controller.getProjectTracks); 

router.get('/:id', controller.getUserTracks);
router.get('/getbyusername/:username', controller.getTracksByUsername);

//router.get('/:id', controller.show);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
module.exports = router;
