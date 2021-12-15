import React from "react";
import './styles.scss';
import useVisualMode from "hooks/useVisualMode";


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
const EDITING = 'EDITING';
const CONFIRMING = 'CONFIRMING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';



const Appointment = (props) => {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
      
      {mode === SHOW && (
      <Show 

        student={props.interview.student}
        interviewer={props.interview.interviewer}
        
      />)}
 
      </article>
  );
}

export default Appointment;