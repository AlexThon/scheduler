import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"
import {useState} from 'react';

  const Form = (props) => {
    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    
    const reset = () => {
      setInterviewer('');
      setStudent('');

      props.onCancel();
      
    }

    
    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              /*
                This must be a controlled component
                your code goes here
              */
              value={student}
              onChange={(evt) => setStudent(evt.target.value)}
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
          <section className="appointment__actions">
            <Button danger onClick={reset}>Cancel</Button>
            <Button confirm onClick={props.onSave}>Save</Button>
          </section>
        </section>
      </main>

    );
  } // close create
  
    
export default Form;