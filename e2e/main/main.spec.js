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
    expect(element.all(by.repeater('track in tracks').column('track.name')).getText()).
           toEqual([ 'Wareru9', 'Wind Dark', 'Horror Gyaku', 'Lost Chair', 'Rumor' ]);
  }); 

it('should expect track names after button click', function() {
    browser.waitForAngular();
    element(by.buttonText('Show/Hide')).click();
    browser.waitForAngular(); 
    
    expect(element.all(by.repeater('track in tracks').column('track.name')).getText()).
           toEqual([ 'Wareru9', 'Wind Dark', 'Horror Gyaku', 'Lost Chair', 'Rumor' ]);
    
    expect(element.all(by.css(".track_list li .wavesurfers")).getText()).
    toEqual([ 'Backward Play / Pause Forward Toggle Mute Download', 'Backward Play / Pause Forward Toggle Mute Download', 'Backward Play / Pause Forward Toggle Mute Download', 'Backward Play / Pause Forward Toggle Mute Download', 'Backward Play / Pause Forward Toggle Mute Download' ]);
    
    
  }); 
    
});
