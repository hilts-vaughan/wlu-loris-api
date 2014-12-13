var DefaultScript = require('./default')
var _ = require('lodash-node');
var cheerio = require('cheerio');


/*
	Defines a simple script for download configuration of a specific course page and also
	contains details for extracting data from said pages. It's a self contained module for scraping
	given a set of input data.
 */
function WLUCourseScript() {


	this.getConfiguration = function() {
		
		var defaultScriptConfig = new DefaultScript().getConfiguration();

		var scriptConfig = {
			url: 'https://telaris.wlu.ca/ssb_prod/bwckschd.p_get_crse_unsec'

		};

		// Merge in the default settings and then over-ride them with any scraper specific settings that might be required
		var newConfig = {};
		_.merge(newConfig, defaultScriptConfig);
		_.merge(newConfig, scriptConfig);

		return newConfig;
	};


	this.parseScrapedData = function(html) {

		$ = cheerio.load(html);

		var x = -1;
		var that = this;
		var courses = [];
		$('.datadisplaytable').each(function(i, elem) {
 			
 			x++;

 			if(x % 3 != 0)
 				return;

 			var courseHeader = $(this).find("a").first();
 			var courseText = courseHeader.text();

 			if(courseText == "")
 				return;

 			// Log our lock onto the course name
 			var courseCode = that.parseCourseCode(courseText);
 			console.log("Found course in department, course code is: " + courseCode);
 			var newCourse = {};
 			newCourse.code = courseCode;
 			courses.push(newCourse);
		});



		x = -1;
		var n = 0;

		// We should filter for each timetable now to extract the information we need
		$('.datadisplaytable').each(function(i, element) {

			x++;

			if(x % 3 != 1)
				return;

			// Get the current course to modify
			var course = courses[n];
			
			if(!course)
				return;

			// Inside, we can retrieve each element we want
			var info = $(this).find(".dddefault");
			var timeText = info.eq(1).text();
			var daysText = info.eq(2).text();
			var buildingsText = info.eq(3).text();
			var datesText = info.eq(4).text();
			var instructorText = info.eq(6).text();

			// Insert into the course 
			course.times = that.parseTime(timeText);
			course.days = daysText;
			course.building = that.parseBuilding(buildingsText);
			course.dates = that.parseDateRange(datesText);
			course.instructor = instructorText;

			


			// Counter increment
			n++;

		});
		
		return courses;
	};


	this.parseCourseCode = function(courseLine) {
		return courseLine.split(" - ")[2].trim();
	};

	/*
		Using an internal maps, attempts to parse the buildings into usable codes.
		For now, we can just use the entire string and store it as that's "good enough"		
	 */
	this.parseBuilding = function(buildingLine) {
		return buildingLine;
	};


	/*
		Given a date line from the LORIS page, returns an array with two elements
		representing Date objects for the beginning and the ending of the course.
	 */
	this.parseDateRange = function(dateLine) {
		var splitDates = dateLine.split(" - ");
		var firstDate = new Date(splitDates[0]);
		var secondDate = new Date(splitDates[1]);

		return [firstDate, secondDate];
	};

	this.parseTime = function(timeLine) {
		var splitTimes = timeLine.split(" - ");

		// If time is not available, just forget it
		if(splitTimes.length < 2)
			return [];

		var times = [];

		for(var i = 0; i < 2; i++) {
			var d = new Date();
	  		var time = splitTimes[i].match(/(\d+)(?::(\d\d))?\s*(p?)/);
	  		d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
	  		d.setMinutes( parseInt(time[2]) || 0 );
  		
  			times.push(d);
  		}	

  		return times;
	};


}

module.exports = WLUCourseScript;