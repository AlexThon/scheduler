import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

const InterviewerList = (props) => {
	const listInterviewers =
		props.interviewers &&
		props.interviewers.map((interviewer) => (
			<InterviewerListItem
				key={interviewer.id}
				selected={interviewer.id === props.value}
				onChange={() => props.onChange(interviewer.id)}
				name={interviewer.name}
				avatar={interviewer.avatar}
			/>
		));

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{listInterviewers}</ul>
		</section>
	);
};

export default InterviewerList;
