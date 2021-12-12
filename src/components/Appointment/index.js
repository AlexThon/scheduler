import React from "react";
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show'


const Appointment = (props) => {

  return (
    <article className="appointment">
      <Header time={props.time} />
      {!props.interview && <Empty />}
      {props.interview && (
      <Show 
        id={props.id} 
        interviewer={props.interview.interviewer} 
        student={props.interview.student} 
      />)}
 
      </article>
  );
}

export default Appointment;