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

	 // Generates a filter for the questions
      var filter = {};
      for(var k in req.query)
        filter[k] = req.query[k];

      // In the case of the building types, we want partial matching to be allowed
      if(filter.building) {
      	filter.building = {
      		    $regex: filter.building,
    			$options: 'i' //i: ignore case, m: multiline, etc
      	}
      }

	
	  console.log(filter);      

      // Grab a monk
      var db = require('monk')('localhost/coursesDB');
      var courseCollection = db.get('courses');

      courseCollection.find(filter, {}, function(error, courses) {

      	if(error) {
      		res.send('KO');
      	}
      	else {
      		res.send(courses);
      	}

      });


	});
}

module.exports.routes = CourseRoutes;