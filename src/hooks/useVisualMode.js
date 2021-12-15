import {useState} from 'react';

export default  function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (newMode) => {
    if(newMode){
      setMode(newMode)
    } else {
      setMode(mode)
    }

  }
  return {mode, transition}
}

