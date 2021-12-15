import React, {useState, useEffect} from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";
import "./Application.scss";



export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day }); 

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
    
      const [first, second, third] = all;
      setState(prev => ({...prev, days: first.data, appointments: second.data, interview: third.data }));
      console.log("interview", second.data)
     
    });



  }, [])
  // const dailyAppointments = Object.values(state.appointments);
  // const appointMents = dailyAppointments.map(appointment => (
  //   <Appointment key={appointment.id} {...appointment}/>));
  
  
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = Object.values(state.appointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  }); 
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler" 
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            value={state.day} 
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
