import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

const DayListItem = ({name, spots, selected, setDay}) => {
  
  const dayListStyle = classNames('day-list__item ', 
  {
    'day-list__item--selected':selected,
    'day-list__item--full' : spots === 0
  }
  );

  const formatSpots = (spots) => {
    let message = '';
    if(spots === 0) {
      message = 'no spots remaining';
    }
    if (spots === 1) {
      message = '1 spot remaining';
    }

    if (spots > 1) {
      message = spots + ' spots remaining';
    }
    return (message);
  }

  return (
    <li onClick={() => setDay(name)} className={dayListStyle}>
      <h2  className='text-regular'>{name}</h2>
      <h3  className='text-align'>{formatSpots(spots)}</h3>

    </li>
  );
}

export default DayListItem;