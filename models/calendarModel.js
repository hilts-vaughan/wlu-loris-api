var RSVP = require('rsvp');
var moment = require('moment');

function CalendarModel() {

	this.selectCalendarDay = function() {
		return new RSVP.Promise(function(resolve, reject) {
			try {
				return resolve('Today is ' + moment().format('dddd') + '.');
			} catch (err) {
				return reject('Chronos took the day off.');
			}
		});
	};

	this.validateCalendarAppointment = function(req) {
		if (typeof(req) === 'undefined') {
			return {
				error: 'Provide appointment information.'
			};
		} else if (typeof(req.params.dateTime) === 'undefined' || !moment(req.params.dateTime, ['YYYY-MM-DD hh:mm'], true).isValid()) {
			return {
				error: 'Provide valid appointment date & time.'
			};
		} else if (typeof(req.params.description) === 'undefined' || req.params.description.trim() === '') {
			return {
				error: 'Provide valid appointment description.'
			};

			//in a real-life application, this list of attendees would be defined by
			//usernames/emails, looped through, and properly validated against a datastore
		} else if (typeof(req.params.attendees) === 'undefined' || req.params.attendees.length === 0) {
			return {
				error: 'Provide appointment attendees.'
			};
		}

		return true;
	};

	this.insertCalendarAppointment = function(req) {
		return new RSVP.Promise(function(resolve, reject) {
			var validationStatus = this.validateCalendarAppointment(req);

			if (validationStatus.hasOwnProperty('error')) {
				return reject(validationStatus.error);
			}

			/*
			data persistance of some sort here...

			dataStore.insert({
				table: 'calendar'
				dateTime: req.params.dateTime,
				desc: req.params.description,
				attendees: req.params.attendees
			})
			.then(function(res) {
				return resolve(res); //returns id (PK of calendar table)
			})
			.catch(function(err) {
				return reject(err);
			});
			*/

			//since this project has no opinions on the datastore, the
			//newly inserted id is mocked via:
			return resolve({
				id: Math.floor((Math.random() * 100) + 1)
			});

		}.bind(this));
	};

}

module.exports = CalendarModel;