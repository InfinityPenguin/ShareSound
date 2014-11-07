'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "sharesound-secret",

  AWS_ACCESS_KEY: 'AKIAIPYHO4CHEDLF54VQ',
  AWS_SECRET_KEY: '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',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
