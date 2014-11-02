'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "sharesound-secret",

  AWS_ACCESS_KEY: 'AKIAJ4SRRY6W7PAZNVLA',
  AWS_SECRET_KEY: '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',

  FACEBOOK_ID: '778610525529067',
  FACEBOOK_SECRET: 'beb329005d94cd9a565902934f630408',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
