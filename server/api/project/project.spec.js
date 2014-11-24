'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');
var Project = require('./project.model');
var User = require('../user/user.model');

describe('GET /api/projects', function() {
  before(function(done){
    Project.find({owner: 'testowner'}).remove(function() {
    done();   
    })
  }); 
  after(function(done){
    Project.find({owner: 'testowner'}).remove(function() {
    done();   
    })
  }); 

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/projects')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should create a new project', function(done) {
    request(app)
      .post('/api/projects/')
      .send({name: 'testprojname', owner: 'testowner'})
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body['name'], 'testprojname')
        assert.equal(res.body['owner'], 'testowner')
        done();
      });
  });

  it('should find project', function(done) {
    var testproj = new Project({name: 'testprojname', owner: 'testowner'})
    testproj.save(function(err, proj) {
      if(err) return done(err);
      request(app)
        .get('/api/projects/user/testowner')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert(res.body.length > 0);
          done();
        });
    })
  });


  it('should find project by username', function(done) {
    var testuser = new User({username : 'testowner', password: "1234123"})
    testuser.save(function(err, user) {
        var userid = testuser._id
        var testproj = new Project({name: 'testprojname', owner: userid})
        testproj.save(function(err, proj) {
          if(err) return done(err);
          request(app)
            .get('/api/projects/getprojectsbyusername/testowner')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              assert(res.body.length > 0);
              done();
            });
        })
      });
    })


});