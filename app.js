var restify = require('restify');
var fs = require('fs');
var email = require("emailjs");
var domain = require('domain');
var config = require('./config');

var CourseScraper = require('./scraper/courseScraper');


// Check if we're running in scrape before we actually try and scrape the fresh content first
if(process.argv[2] == "-scrape") {
	var scraper = new CourseScraper();
	scraper.start();
}



//Server instance with registered options
var api = restify.createServer({
	name: config.api.name,
	formatters: {
		'application/json': function(req, res, body){
			return JSON.stringify(body);
		}
	}
});

api.pre(restify.pre.sanitizePath());

api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.queryParser());
api.use(restify.authorizationParser());

//CORS
api.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});

//Global error handler
api.use(function(req, res, next) {
	var domainHandler = domain.create();
	
	domainHandler.on('error', function(err) {
		var errMsg = 'Request: \n' + req + '\n';
		errMsg += 'Response: \n' + res + '\n';
		errMsg += 'Context: \n' + err;
		errMsg += 'Trace: \n' + err.stack + '\n';

		console.error(errMsg);
		domain.dispose();
	});

	domainHandler.enter();
	next();
});

console.error = function(errMsg) {
	if (config.environment.name === 'development' || config.environment.name === 'production') {
		var sender = config.environment.bugSenderEmail;
		var reciever = config.environment.bugRecieverEmail;

		var emailClient = email.server.connect({
			user: sender.email,
			password: sender.password,
			host: sender.smtpHost,
			ssl: sender.ssl
		});

		emailClient.send({
			text: errMsg,
			from: '<' + sender.email + '>',
			to: '<' + reciever + '>',
			subject: config.api.name + ' - Error'
		});
	} else {
		console.log(errMsg);
	}
};

//Iterates through all ./routes files to find matching route
fs.readdirSync('./routes').forEach(function (curFile) {
	if(curFile.substr(-3) === '.js') {
		route = require('./routes/' + curFile);
		route.routes(api);
	}
});

api.listen(config.environment.port, function() {
	var dashChars = '+' + Array(32 + api.url.length + config.api.name.length).join('-') + '+';
	console.log(dashChars);
	console.log('| Application `%s` is running at %s |', config.api.name, api.url);
	console.log(dashChars);
});