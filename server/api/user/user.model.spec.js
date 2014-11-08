'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var supertest = require('supertest');
var api = supertest('http://localhost:9000');
var expect = require('expect.js');

var user = new User({
  provider: 'local',
  username: 'Fake User',
  password: 'password'
});


describe('User Model', function() {
  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a username', function(done) {
    user.username = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });
    
 it('should fail when saving username with invalid characters (not numbers, letters, dashes, underscores)', function(done) {
    user.username = 'this!is#````bad';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

it('should fail saving password that is too short)', function(done) {
    user.password = '123';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  
  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
    
   
   it('will create user through post request', function(done){
    api.post('/api/users')
      .send({ username: 'cooluser', password: '123123'})
      .end(function(e,res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body['status code']).to.eql(1)
        done()
      }); 
   });
    
  it('will create blank user through post request', function(done){
    api.post('/api/users')
      .send({ username: '', password: '123123'})
      .end(function(e,res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body['status code']).to.eql(-2)
        done()
      }); 
   });
    
   it('will create duplicate user', function(done){
    api.post('/api/users')
      .send({ username: 'notspecial', password: '123123'})
      .end(function(e, res){
          api.post('/api/users')
          .send({ username: 'notspecial', password: '123123'})
            .end(function(e,res){
            console.log(res.body)
            expect(e).to.eql(null)
            expect(res.body['status code']).to.eql(-1)
            done(); 
      }); 
          
      }); 
    
   });
    
   it('will create user with too short password through post request', function(done){
    api.post('/api/users')
      .send({ username: 'tooshort', password: '123'})
      .end(function(e,res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body['status code']).to.eql(-3)
        done()
      }); 
   });
    
    it('will create user with bad characters in username through post request', function(done){
    api.post('/api/users')
      .send({ username: 'John Doe!', password: '123123'})
      .end(function(e,res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body['status code']).to.eql(-2)
        done()
      }); 
   });
    
  
    
    
    
    
});

