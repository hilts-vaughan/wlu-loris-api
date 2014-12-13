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

	this.toQuery = function(obj) {

				 var str = [];
		  for(var p in obj)
		    if (obj.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    }
		  return str.join("&");

	};

	/*
		@param	config 	A raw JavaScript object containing the options and attributes required to kickstart the scraping process
	 */
	this.getHTML = function(config) {



		if(!config)
			throw new Error("The provided configuration object was null so that CourseDownloader cannot begin downloading!");

		var data = this.toQuery(config.postData);
		data = "sel_subj=dummy&sel_camp=dummy&sel_levl=dummy&" + data;

		//TODO: remove this dirty hack when WLU fixes their stuff; for some reason they require a duplicate field

		request.post(
			{
				url: "https://telaris.wlu.ca/ssb_prod/bwckschd.p_get_crse_unsec",
				"rejectUnauthorized": false,
				form: data,
				proxy: 'http://127.0.0.1:8888',
				headers: {
							'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
							'Accept-Encoding' : 'gzip, deflate',
							'Accept-Language' : 'en-US,en;q=0.8',
							 'Cache-Control': 'max-age=0',
							 'Origin': 'chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm',
							 'Referer': 'https://telaris.wlu.ca/ssb_prod/bwckgens.p_proc_term_date',
							'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2248.0 Safari/537.36',
							'Cookie': 'Cookie: bbbbbbbbbbbbbbb=ELKCFOBHDOJCIKCKFOFJGACMIODDLHPFBMEGGBJBONADHJDNEECOFNKGLLMAKHKLIENLINNNEOCBGCPHBIDFMOCNJHPHIFDOKFLBNAMJGAJHDLJMCPKDEJDPAFLLGKGD; f5_cspm=1234; BIGipServerpool_ssbanner=190056970.20480.0000; aaaaaaaaaaaaaaa=DEPHPFFEIKODLPLDFOEIHADMGPFKHNAAELABJKHFONACMPNONGICMIONLLMAJDACEOLCEMNNOAPEKOAPADAICOCNJGHPEMMNIJCIIAIOMFBBGJLGJDHOBAAGEKMFCACP'

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