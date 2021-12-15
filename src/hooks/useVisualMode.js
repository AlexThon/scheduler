import {useState} from 'react';

export default  function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace=false) => {
    if(replace) {
      setMode(newMode)
    } else {
      setMode(newMode)
      setHistory([...history, newMode])
    }
  }
  const back =  () => {
    let new_history = [...history];
    if(new_history.length > 1){
      new_history.pop();
      setMode(new_history[new_history.length - 1])
      setHistory([...new_history])
    } 

  }
  return {mode, transition, back }
}

