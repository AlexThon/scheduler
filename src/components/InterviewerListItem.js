import React from "react";
import classNames from "classnames";
import './InterviewerListItem.scss';

const InterviewerListItem = ({name, avatar, selected, onChange}) => {
  
  const conditionStyle = classNames("interviewers__item", 
  {
    'interviewers__item--selected':selected
  }
  );
  
  
  return (
    <li className={conditionStyle} onClick={onChange}>
      <img 
        className = 'interviewers__item-imgae'
        src={avatar}
        alt={name}
      />
      { selected && name}
    </li>    

  );

}

export default InterviewerListItem;