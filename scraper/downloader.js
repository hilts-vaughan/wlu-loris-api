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
		console.log(config.postData);
		request.post(
			{
				url: "https://telaris.wlu.ca/ssb_prod/bwckschd.p_get_crse_unsec",
				"rejectUnauthorized": false,
				form: config.postData,
				headers: {
							'Accept': '*/*',
							'Accept-Encoding' : 'gzip, deflate',
							'Accept-Language' : 'en-US,en;q=0.8',
							'Cache-Control': 'no-cache',
							'Connection': 'keep-alive',
							'Content-Type': 'application/x-www-form-urlencoded',
							'Cookie':'f5_cspm=1234; bbbbbbbbbbbbbbb=JKKCJMKHGFNLKNLFLLHFLFFKIGBGEDJKPKKJAOAOPMADBCLJCLLBFDGCKJDALCAFGMMKGKACOOKDIINFOMDFADAGIJJMNOHPELKDCIPCLLBJKKEOAPJBCDLOFOFLPCBI; BIGipServerpool_ssbanner=190056970.20480.0000; bbbbbbbbbbbbbbb=OHGKMHNHCIILONBFCMDKILPBHIAOOPPOOAIFFMLFNEIDEGEBMGMAPILJLBFAIEBFIDIOOFCBOCDCJDAKIMBAPFBGPFOMCBFMAENHDBDMKMFJCNMFOBMIDKMIMMLCCJIJ',
							'Host': 'telaris.wlu.ca',
							'Origin': 'chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm',
							'Pragma': 'no-cache',
							'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2248.0 Safari/537.36'

    			}
			}
			, function ocallback(err, httpResponse, body) {
  			
  			if (err) {
    			return console.error('upload failed:', err);
  			}

  			console.log(httpResponse.headers.location);
  			events.emit('html', body);
		});



	};


}

module.exports = CourseDownloader;