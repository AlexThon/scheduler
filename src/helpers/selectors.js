import React from "react";

export function getAppointmentsForDay (state, day){
  
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);
  if(filteredDays.length === 0 || !day) {
    return [];
  }

  for (let day of filteredDays) {
    
    return  day.appointments.map(id => state.appointments[id]);
  } 
  
}

export const getInterview = (state, interview) => {
  if(!interview) {
    return null;
  }
  const resultObj = {student: interview.student}
  resultObj.interviewer = state.interviewers[interview.interviewer]
  return resultObj;
}

