'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should expect splash page', function() {
    expect(page.h1El.getText()).toBe('Welcome to ShareSound');
    
  });
});

describe('Dashboard', function() {
  var page;

  beforeEach(function() {
    browser.get('/login');
    element(by.model('user.username')).sendKeys('test');
    element(by.model('user.password')).sendKeys('123123'); 
    
    element(by.buttonText('Login')).click();
    
  });

  it('should expect welcome messages', function() {
    
    
     expect(element.all(by.binding('getCurrentUser().username')).getText()).
        toEqual(['Hello test', 'Welcome test']); 
  });
 
 
it('should expect track names before button click', function() {
    expect(element.all(by.repeater('project in project').column('project.name')).getText()).
           toEqual(['awesome project', 'blank', 'new project', 'test project' ]);
  }); 

it('should expect track names after button click', function() {
    browser.waitForAngular();
    element(by.cssContainingText('h3', 'test project')).click();
    browser.waitForAngular(); 
    
    expect(element.all(by.repeater('track in projectservice.currProjectTracks').column('track.name')).getText()).
           toEqual([ 'Wareru9' ]);
    
    element(by.buttonText('Show Tracks')).click();
     browser.waitForAngular(); 
    
    expect(element.all(by.css(".controls")).getText()).
    toEqual([ 'Play All Pause All Stop All' ]);
    
    
  }); 
    
});
