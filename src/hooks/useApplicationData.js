import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  
  // Add interview into the scheduler
  const bookInterview = (appointmentId, interview) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview },
    };
    
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };
    
    return axios.put(`/api/appointments/${appointmentId}`, { interview })
    .then( () => {
      // updateSpotf() have a default value of true as an input
      const days = updateSpots();
      setState({
        ...state,
        appointments,
        days:days
      })
    })

  };

  // delete interview in the scheduler
  const cancelInterview = (appointmentId) => {
    const deleteInterview = {
      ...state.appointments[appointmentId],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [appointmentId]: deleteInterview,
    };

    return axios.delete(`/api/appointments/${appointmentId}`)
    .then( () => { 
      const days = updateSpots(false);
      setState({
      ...state,
      appointments,
      days:days
      }) 
    })
  }
 
  const updateSpots = (increment=true) => {
    for (let day of state.days) {
      if (day.name === state.day) {
        
        const spots =  increment? Number(day.spots) - 1: day.spots + 1;
        const dayWithNewSpots = {...day, spots: spots}
        const days = [...state.days]
        let i = 0;
        
        do {
          if(days[i].name === state.day){
            days[i] = dayWithNewSpots;
          }
          i++;
        }while(i < days.length);
        return days;
      }
    } 
  }



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [first, second, third] = all;
      setState((prev) => ({
        ...prev,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      }));
    
    });
    
  }, []);

  return { state, setDay, bookInterview, cancelInterview}

}

export default useApplicationData;