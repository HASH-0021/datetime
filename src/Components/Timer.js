import { useState, useRef } from 'react';
import CheckboxContainer from '../Helpers/CheckboxContainer';
import MuiSelect from '../Helpers/MuiSelect';
import prefixed0 from '../Helpers/numberTextWithPrefix0';
import './Timer.css';

const Timer = () => {

  const timeSeparators = ["Punctuation","Units"];
  const notAllowedInputs = ["e","+","-","."];

  const [time,setTime] = useState(0);
  const [inputMode,setInputMode] = useState(true);
  const [showMS,setShowMS] = useState(false);
  const [buttonText,setButtonText] = useState("Start");
  const [disableStart,setDisableStart] = useState(true);
  const [timeSeparator,setTimeSeparator] = useState(timeSeparators[0]);

  const timerRef = useRef(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const limitInputCharacters = (event) => {
    for (const char of notAllowedInputs) {
      if (event.key === char) {
        event.preventDefault();
        break;
      }
    }
  }

  const limitInputLength = (event,length) => {
    if (event.target.value.length > length) {
      event.target.value = event.target.value.slice(0,length);
    }
    if (inputMode) {
      const inputHour = Number(document.querySelector("#input-hour").value);
      const inputMinute = Number(document.querySelector("#input-minute").value);
      const inputSecond = Number(document.querySelector("#input-second").value);
      const inputMilliSecond = showMS ? Number(document.querySelector("#input-milli-second").value) : 0;
      if (inputHour+inputMinute+inputSecond+inputMilliSecond > 0) {
        setDisableStart(false);
      }else {
        setDisableStart(true);
      }
    }
  }

  const timerStartStop = () => {
    if (buttonText !== "Pause") {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTime(time + Date.now() - startTimeRef.current);
      },1);
      if (inputMode) {
        const inputHour = Number(document.querySelector("#input-hour").value);
        const inputMinute = Number(document.querySelector("#input-minute").value);
        const inputSecond = Number(document.querySelector("#input-second").value);
        const inputMilliSecond = showMS ? Number(document.querySelector("#input-milli-second").value) : 0;
        timerRef.current = (inputHour*3600*1000)+(inputMinute*60*1000)+(inputSecond*1000)+inputMilliSecond;
        setInputMode(false);
      }
      setButtonText("Pause");
    }else {
      clearInterval(intervalRef.current);
      setButtonText("Resume");
    }
  }

  const timerReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setInputMode(true);
    setButtonText("Start");
    setDisableStart(true);
  }

  let milliSeconds = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let duration = timerRef.current-time;
  if (!inputMode && duration <= 0) {
    timerReset();
  }else {
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
  }
  
  return(
    <>
      <div id = "timer-container">
        <p className = "timer-time">
          {inputMode ? <input type = "number" id = "input-hour" defaultValue = "00" min = "0" onInput = {(event) => limitInputLength(event,6)} onKeyPress = {limitInputCharacters} />:hours}{timeSeparator === "Units" ? "h" : ":"}
        </p>
        <p className = "timer-time">
          {inputMode ? <input type = "number" id = "input-minute" defaultValue = "00" min = "0" max = "59" onInput = {(event) => limitInputLength(event,2)} onKeyPress = {limitInputCharacters} />:minutes}{timeSeparator === "Units" ? "m" : ":"}
        </p>
        <p className = "timer-time">
          {inputMode ? <input type = "number" id = "input-second" defaultValue = "00" min = "0" max = "59" onInput = {(event) => limitInputLength(event,2)} onKeyPress = {limitInputCharacters} />:seconds}{timeSeparator === "Units" ? "s" : null}
        </p>
        {
          showMS && 
          <p className = "timer-time">
            {timeSeparator === "Units" ? null : "."}{inputMode ? <input type = "number" id = "input-milli-second" defaultValue = "000" min = "0" max = "999" onInput = {(event) => limitInputLength(event,3)} onKeyPress = {limitInputCharacters} />:milliSeconds}{timeSeparator === "Units" ? "ms" : null}
          </p>
        }
      </div>
      <div id = "timer-options">
        <button onClick = {timerStartStop} disabled={disableStart}>{buttonText}</button>
        <button onClick = {timerReset} disabled={buttonText === "Start"}>Reset</button>
        <CheckboxContainer label = "milli-seconds" checked = {showMS} setChecked = {setShowMS} />
        <MuiSelect label = "Separator" options = {timeSeparators} setOption = {setTimeSeparator} disabled = {false} />
      </div>
    </>
  )
}

export default Timer;