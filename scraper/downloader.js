var util = require('util');
var fs = require('fs');
var request = require('request');
var EventEmitter = require("events").EventEmitter;
var FormData = require('form-data');


/*
	A class responsible for scraping the course data from the EEllucian Company L.P dynamic scheduling system.
	While this particular application is designed specifically for WLU, it has enough extensibility to work for 
	other schools by simply plugging in other scripts.
 */
function CourseDownloader() {

	var events = new EventEmitter();

	this.events = events;	

	/*
		@param	config 	A raw JavaScript object containing the options and attributes required to kickstart the scraping process
	 */
	this.getHTML = function(config) {



		if(!config)
			throw new Error("The provided configuration object was null so that CourseDownloader cannot begin downloading!");


		console.log(config);
		request.post(
			{
				url: config.url,
				"rejectUnauthorized": false,
				form: config.postData,
				headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2239.2 Safari/537.36'
    			}
			}
			, function ocallback(err, httpResponse, body) {
  			
  			if (err) {
    			return console.error('upload failed:', err);
  			}

  			events.emit('html', body);
		});



	};


}

module.exports = CourseDownloader;