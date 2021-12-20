export function getAppointmentsForDay(state, day) {
	const filteredDays = state.days.filter(
		(daySelected) => daySelected.name === day
	);
	if (filteredDays.length === 0 || !day) {
		return [];
	}

	for (let day of filteredDays) {
		return day.appointments.map((id) => state.appointments[id]);
	}
}

export const getInterview = (state, interview) => {
	if (!interview) {
		return null;
	}
	const resultObj = { student: interview.student };
	resultObj.interviewer = state.interviewers[interview.interviewer];
	return resultObj;
};

export const getInterviewersForDay = (state, day) => {
	if (!day) {
		return [];
	}

	const filteredDays = state.days.filter((dayObj) => dayObj.name === day); //

	let interviewers = [];

	for (let day of filteredDays) {
		day.interviewers.forEach((interviewerId) => {
			const interviewer = state.interviewers[interviewerId];
			if (interviewer) {
				interviewers.push(interviewer);
			}
		});
	}
	return interviewers;
};
