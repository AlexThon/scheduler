import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = (props) => {
	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState('');

	const reset = () => {
		setInterviewer(null);
		setStudent('');
		setError('');
	};

	const cancel = () => {
		reset();
		props.onCancel();
	};

	// Validation
	const validate = () => {
		if (student === '') {
			setError("Add student's name");
			return;
		}
		if (!interviewer) {
			setError('Select an interviewer');
			return;
		}

		setError('');
		props.onSave(student, interviewer);
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(evt) => evt.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={student}
						onChange={(evt) => setStudent(evt.target.value)}
						data-testid="student-name-input"
					/>
				</form>
				<InterviewerList
					/* your code goes here */
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
        <section>{error}</section>
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}; // close create

export default Form;
