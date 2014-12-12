var expect = require('chai').expect;
var chance = new require('chance')();
var moment = require('moment');
var CalendarModel = require('../models/calendarModel');

describe("Calendar Feature", function() {
	it("should return current day of the week", function(done) {
		var out = '';

		new CalendarModel().selectCalendarDay()
			.then(function(day) {
				out = day;
			})
			.catch(function(err) {
				console.error(err);
				out = err;
			})
			.finally(function() {
				expect(out).to.equal('Today is ' + moment().format('dddd') + '.');
				done();
			});
	});

	it("should add a new appointment", function(done) {
		var out = '';

		var req = {
			params: {
				dateTime: moment(chance.timestamp()).format('YYYY-MM-DD hh:mm'),
				description: chance.paragraph({
					sentences: 1
				}),
				attendees: [
					chance.name(),
					chance.name(),
					chance.name()
				]
			}
		};

		new CalendarModel().insertCalendarAppointment(req)
			.then(function(status) {
				out = status;
			})
			.catch(function(err) {
				console.error(err);
				out = status;
			})
			.finally(function() {
				expect(out).to.have.property('id');
				done();
			});
	});
});