'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var User = require('./user.model');
var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.use('/login', require('../../auth/local'));
router.post('/create_user', controller.create); 

router.post('/resetFixture', function(req, res) {
	User.remove({},function(err) {
		return res.json({errCode: 1})
	})
})
module.exports = router;
