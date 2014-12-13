var util = require('util');
var fs = require('fs');
var CourseDownloader = require('./downloader');
var WLUCourseScript = require('./scripts/wluCourseScript');
var CoursePersister = require('./coursePersister');

/*
	A class responsible for scraping the course data from the EEllucian Company L.P dynamic scheduling system.
	While this particular application is designed specifically for WLU, it has enough extensibility to work for 
	other schools by simply plugging in other scripts.
 */
function CourseScraper() {



	/*
		Begins the scraping of the course data process with the given script name.
	 
		@param	scriptName (optional)	The name of the script to use for the scraping process.
	 */
	this.start = function(scriptName) {

		// Bootstrap with the WLU scraper if nothing else suitable can be found
		scriptName = scriptName || "wluCourseScript";

		console.log("Executing scraper script " + scriptName);
		downloader.getHTML(new WLUCourseScript().getConfiguration());

	};


	this.processHtml = function(body) {
		
		console.log("Attempting to parse data...");
		var script = new WLUCourseScript();		
		var courseData = script.parseScrapedData(body);

		// We need some sort of persistance layer; so for now we'll just dump it into some sort of 

		console.log("All done. Persisting to DB...");
		var persister = new CoursePersister();
		persister.persistCourses(courseData);		

	};


	var downloader = new CourseDownloader();
	downloader.events.on('html', this.processHtml);


}

module.exports = CourseScraper;