var restify = require('restify');
var config = require('../config');

var rateLimit = restify.throttle({
	burst: config.limiter.defaultBurstRate,
	rate: config.limiter.defaultRatePerSec,
	ip: true
});

function CourseRoutes(api) {

	/*
		A simple route for fetching every single course available
	 */
	api.get('/courses', rateLimit, function(req, res, next) {

	});
}

module.exports.routes = CourseRoutes;