var CalendarModel = require('../models/calendarModel');

function CalendarController(req, res, next) {

	this.getCalendarDay = function() {
		var calModel = new CalendarModel();

		calModel.selectCalendarDay()
			.then(function(day) {
				res.send(200, day);
			})
			.catch(function(err) {
				res.send(500, {error: err});
			});
	};

	this.postCalendarAppointment = function() {
		var calModel = new CalendarModel();

		calModel.insertCalendarAppointment(req)
			.then(function(status) {
				res.send(201, status);
			})
			.catch(function(err) {
				res.send(500, {error: err});
			});
	};

}

module.exports = CalendarController;