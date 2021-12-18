import React from 'react';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';

// Transition state
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = (props) => {


	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	const save = (name, interviewer) => {
		transition(SAVING);
		const interview = {
			student: name,
			interviewer,
		};
	
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch((error) => transition(ERROR_SAVE, true));
	}

	const destroy = () => {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch((error) => transition(ERROR_DELETE, true));

	}
	

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

			{mode === SHOW && (
				<Show
					student={props.interview && props.interview.student}
					interviewer={props.interview && props.interview.interviewer.name}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}

			{mode === CREATE && (
				<Form 
					interviewers={props.interviewers} 
					onSave={save} 
					onCancel={back} 
				/>
			)}

			{mode === EDIT && (
				<Form 
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers} 
					onSave={save} 
					onCancel={back} 
				/>
			)}

			{mode === CONFIRM && (
				<Confirm 
					message="Confirm to delete!"
					onCancel={back}
					onConfirm={destroy}
				/>
			)}

			{mode === SAVING && (<Status message="Saving" />)}

			{mode === DELETING && (<Status message="Deleting" />)}

			{mode === ERROR_SAVE && (
				<Error message="Error saving appointment" onClose={back} />
			)}

			{mode === ERROR_DELETE && (
				<Error message="Error deleting appointment" onClose={back} />
			)}	
		</article>
	);
};

export default Appointment;
