'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.post('/upload_track', controller.create);
router.post('/delete_track', controller.destroy);
router.post('/download_track', controller.download);
router.get('/getUploadURL', controller.generateSignedURL);
router.get('/foo', controller.foo);





























router.put('/', controller.upload);


router.get('/:id', controller.getUserTracks);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
module.exports = router;