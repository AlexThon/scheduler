import React from "react";

import DayListItem from "./DayListItem";


const DayList = (props) => {
  
  const daysListParsed = props.days.map(day => <DayListItem 
    selected={day.name === props.day}
    setDay={props.setDay}
    key={day.id} 
    {...day}/>)
  return (
    <ul>
      {daysListParsed}
    </ul>
  )
}

export default DayList;