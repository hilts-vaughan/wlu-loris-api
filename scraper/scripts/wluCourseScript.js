var DefaultScript = require('./default')
var _ = require('lodash-node');

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


	this.parseScrapedData = function() {

	};


}

module.exports = WLUCourseScript;