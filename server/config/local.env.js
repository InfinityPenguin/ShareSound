'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
	DOMAIN: 'http://localhost:9001',
	SESSION_SECRET: "sharesound-secret",

	AWS_ACCESS_KEY: 'AKIAJBIUEPGJVAX3KSFA',
	AWS_SECRET_KEY: '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',

	FACEBOOK_ID: 'app-id',
	FACEBOOK_SECRET: 'secret',
	// Control debug level for modules using visionmedia/debug
	DEBUG: ''
};
