'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/:id', controller.show);
// router.post('/', controller.create);
router.post('/', controller.dummy);

router.get('/', controller.generateSignedURL);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
// router.get('/', controller.download);
router.put('/', controller.upload);
// router.get('/download', controller.download);

module.exports = router;