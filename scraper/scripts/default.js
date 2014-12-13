
function DefaultScript() {


	/*
		Returns the default script configuration.
	 */
	this.getConfiguration = function() {
		return {
			postData: {
					sel_subj:	'dummy',
					sel_camp:	'dummy',
					term_in:	'201409',
					sel_day:	'dummy',
					sel_schd:	'dummy',
					sel_insm:	'dummy',
					sel_levl:	'dummy',
					sel_sess:	'dummy',
					sel_instr:	'dummy',
					sel_ptrm:	'dummy',
					sel_attr:	'dummy',
					sel_camp:	'W',
					sel_subj:	'',
					sel_crse:	'',
					sel_title:	'',
					sel_levl:	'%',
					begin_hh:	'00',
					begin_mi:	'00',
					begin_ap:	'x',
					end_hh:	'00',
					end_mi:	'00',
					end_ap:	'x',
			}
		};
	};



}

module.exports = DefaultScript;