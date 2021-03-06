'use strict';

var express = require('express');
var controller = require('./project.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:id', controller.getUserProjects);
router.get('/getprojectsbyusername/:username', controller.getUserProjectsByUsername);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/tags/add/:id/:tags', controller.addTags); 
router.get('/tags/delete/:id/:tag', controller.deleteTag); 
module.exports = router;