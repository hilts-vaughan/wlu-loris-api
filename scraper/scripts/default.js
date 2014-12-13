
function DefaultScript() {


	/*
		Returns the default script configuration.
	 */
	this.getConfiguration = function() {
		return {
			postData: {
				term_in: "201409",
				sel_subj: "dummy",
				sel_day: "dummy",
				sel_schd: "dummy",
				sel_insm: "dummy",
				sel_camp: "dummy",
				sel_levl: "dummy",
				sel_sess: "dummy",
				sel_instr: "dummy",
				sel_ptrm: "dummy",
				sel_attr: "dummy",
				sel_camp: "%",
				sel_subj: "CP",
				sel_crse: null,
				sel_title: null,
				sel_levl: "%",
				begin_hh: "00",
				begin_mi: "00",
				begin_ap: "X",
				end_hh: "00",
				end_mi: "00",
				end_ap: "X"
			}
		};
	};



}

module.exports = DefaultScript;