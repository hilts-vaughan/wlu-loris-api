exports.api = {
	name: 'Calendar App!',
	version: '2.0.0'
};

exports.environment = {
	name: 'development',
	port: 1337,
	salt: '', //generate one @ random.org
	bugSenderEmail: {
		email: 'bugsend@app.com',
		password: 'bugsendpassword',
		smtpHost: 'smtp.app.com',
		ssl: true
	},
	bugRecieverEmail: 'bugreciever@app.com'
};

exports.limiter = {
	defaultBurstRate: 50,
	defaultRatePerSec: 0.5,
};