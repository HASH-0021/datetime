import { useState,useEffect } from 'react';
import MuiSelect from '../Helpers/MuiSelect';
import LinearProgress from '@mui/material/LinearProgress';
import './YearStatus.css';

const YearStatus = () => {

	const localeLanguageCodes = {
		"International":"en-GB",
		"Indian":"en-IN"
	};
	const localeLanguages = ["International","Indian"];
	
	const [timeStamp,setTimeStamp] = useState(new Date());
	const [localeLanguage,setLocaleLanguage] = useState(localeLanguages[0]);

	useEffect(() => {
		const intervalRef = setInterval(() => {
			setTimeStamp(new Date());
		},1);
		return () => clearInterval(intervalRef);
	},[])

	const currYearStart = new Date(`01-01-${timeStamp.getFullYear()}`);

	const monthsPassed = timeStamp.getMonth() - currYearStart.getMonth();
	const millisecondsPassed = timeStamp.getTime() - currYearStart.getTime();
	const secondsPassed = Math.floor(millisecondsPassed/1000);
	const minutesPassed = Math.floor(secondsPassed/60);
	const hoursPassed = Math.floor(minutesPassed/60);
	const daysPassed = Math.floor(hoursPassed/24);

	const newYearStart = new Date(`01-01-${timeStamp.getFullYear()+1}`);

	const monthsRemain = 11 - timeStamp.getMonth();
	const millisecondsRemain = newYearStart.getTime() - timeStamp.getTime();
	const secondsRemain = Math.floor(millisecondsRemain/1000);
	const minutesRemain = Math.floor(secondsRemain/60);
	const hoursRemain = Math.floor(minutesRemain/60);
	const daysRemain = Math.floor(hoursRemain/24);

	const progress = millisecondsPassed*100/(millisecondsPassed+millisecondsRemain);
	const progressValue = Math.round(progress*100)/100;

	return(
		<>
			<div id = "completed-container">
				<h3>Completed</h3>
				<p>Months        : {monthsPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Days          : {daysPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Hours         : {hoursPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Minutes       : {minutesPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Seconds       : {secondsPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Milli-seconds : {millisecondsPassed.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
			</div>
			<div id = "remaining-container">
				<h3>Remaining</h3>
				<p>Months        : {monthsRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Days          : {daysRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Hours         : {hoursRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Minutes       : {minutesRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Seconds       : {secondsRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
				<p>Milli-seconds : {millisecondsRemain.toLocaleString(localeLanguageCodes[localeLanguage])}</p>
			</div>
			<div id = "year-status-options">
				<MuiSelect label = "Format" options = {localeLanguages} setOption = {setLocaleLanguage} disabled = {false} />
			</div>
			<p id = "progress-value">{progressValue}%</p>
			<LinearProgress variant="determinate" value={progressValue} sx={{width:"75%",height:"7px"}} />
		</>
	);
}

export default YearStatus;