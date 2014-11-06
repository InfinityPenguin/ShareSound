'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "sharesound-secret",

  AWS_ACCESS_KEY: 'AKIAJLKT27B3S2I43ZGQ',
  AWS_SECRET_KEY: '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',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
