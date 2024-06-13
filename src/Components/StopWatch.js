import { useState, useRef } from 'react';
import CheckboxContainer from '../Helpers/CheckboxContainer';
import MuiSelect from '../Helpers/MuiSelect';
import prefixed0 from '../Helpers/numberTextWithPrefix0';
import './StopWatch.css';

const StopWatch = () => {

  const timeSeparators = ["Units","Punctuation"];

  const [time,setTime] = useState(0);
  const [showMS,setShowMS] = useState(false);
  const [buttonText,setButtonText] = useState("Start");
  const [timeSeparator,setTimeSeparator] = useState(timeSeparators[0]);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const stopwatchStartStop = () => {
    if (buttonText !== "Pause") {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTime(time + Date.now() - startTimeRef.current);
      },1);
      setButtonText("Pause");
    }else {
      clearInterval(intervalRef.current);
      setButtonText("Resume");
    }
  }

  const stopwatchReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setButtonText("Start");
  }

  let milliSeconds = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let duration = time;
  if (duration >= 3600000) {
    hours = Math.floor(duration/3600000);
    duration = duration%3600000;
  }
  if (hours < 10) {
    hours = prefixed0(1,hours);
  }
  if (duration >= 60000) {
    minutes = Math.floor(duration/60000);
    duration = duration%60000;
  }
  if (minutes < 10) {
    minutes = prefixed0(1,minutes);
  }
  if (duration >= 1000) {
    seconds = Math.floor(duration/1000);
    duration = duration%1000;
  }
  if (seconds < 10) {
    seconds = prefixed0(1,seconds);
  }
  milliSeconds = duration;
  if (milliSeconds < 10) {
    milliSeconds = prefixed0(2,milliSeconds);
  }else if (milliSeconds < 100) {
    milliSeconds = prefixed0(1,milliSeconds);
  }
  
  return(
    <>
      <div id = "stop-watch-container">
        {hours !== "00" && <p className = "stop-watch-time">{hours}{timeSeparator === "Units" ? "h" : ":"}</p>}
        {(hours !== "00" || minutes !== "00") && <p className = "stop-watch-time">{minutes}{timeSeparator === "Units" ? "m" : ":"}</p>}
        <p className = "stop-watch-time">{seconds}{timeSeparator === "Units" ? "s" : null}</p>
        {showMS && <p className = "stop-watch-time">{timeSeparator === "Units" ? null : "."}{milliSeconds}{timeSeparator === "Units" ? "ms" : null}</p>}
      </div>
      <div id = "stop-watch-options">
        <button onClick = {stopwatchStartStop}>{buttonText}</button>
        <button onClick = {stopwatchReset} disabled={buttonText === "Start"}>Reset</button>
        <CheckboxContainer label = "milli-seconds" checked = {showMS} setChecked = {setShowMS} />
        <MuiSelect label = "Separator" options = {timeSeparators} setOption = {setTimeSeparator} disabled = {false} />
      </div>
    </>
  )
}

export default StopWatch;