'use strict';

var express = require('express');
var controller = require('./track.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/upload_track', controller.create);
router.post('/delete_track', controller.destroy);
router.post('/download_track', controller.download);
router.get('/getUploadURL', controller.getUploadURL);
router.get('/foo', controller.foo);





























router.put('/', controller.upload);


router.get('/:id', controller.getUserTracks);
//router.get('/:id', controller.show);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
module.exports = router;
