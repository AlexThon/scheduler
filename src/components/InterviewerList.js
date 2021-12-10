import React from "react";
import "./InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  
  const listInterviewers = props.interviewers.map(interviewer => <InterviewerListItem 
    key={interviewer.id}
    selected={interviewer.id === props.value}
    onChange={() => props.onChange(interviewer.id)}

    {...interviewer}
  
    /> )

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{listInterviewers}</ul>
</section>
  );
}

export default InterviewerList;