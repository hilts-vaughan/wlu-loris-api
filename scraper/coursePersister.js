/*
	This is the persistance layer responsible for a lot of the basic I/O for storing
	the course data. We use this to have a quick data store to get started with.

 */

function CoursePersister() {

	// Our DB connection for the session
	var db = require('monk')('heroku_app32525329:dvv92vmkf33jbctfsqjba7sjd0@ds063240.mongolab.com:63240/heroku_app32525329');

	this.persistCourses = function(courses) {

		var courseCollection = db.get('courses');
		courseCollection.drop();

		courses.forEach(function(course) {
			courseCollection.insert(course);
		});

	};


}

module.exports = CoursePersister;
