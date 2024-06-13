import { useState,useEffect } from 'react';
import CheckboxContainer from '../Helpers/CheckboxContainer';
import MuiSelect from '../Helpers/MuiSelect';
import prefixed0 from '../Helpers/numberTextWithPrefix0';
import './CurrentDateTime.css';

const CurrentDateTime = () => {

	const dateSeparators = ["-","/"];
	const dateFormats = ["ddmmyyyy","ddmmyy","Mddyyyy","Mddyy","ddMyyyy","ddMyy","yyyymmdd","mmddyyyy","mmddyy"];
	const timeFormats = ["24-hour","12-hour"];

	const [timestamp,setTimestamp] = useState(new Date());
	const [showDay,setShowDay] = useState(false);
	const [dateSeparator,setDateSeparator] = useState(dateSeparators[0]);
	const [disableDateSeparator,setDisableDateSeparator] = useState(false);
	const [dateFormat,setDateFormat] = useState(dateFormats[0]);
	const [showMS,setShowMS] = useState(false);
	const [showTimeZone,setShowTimeZone] = useState(false);
	const [timeFormat,setTimeFormat] = useState(timeFormats[0]);

	useEffect(() => {
		setInterval(() => {
			setTimestamp(new Date());
		},1);
	},[]);

	useEffect(() => {
		setDisableDateSeparator(dateFormat.includes("M") ? true : false);
	},[dateFormat]);

	let date = timestamp.getDate();
	let month = timestamp.getMonth();
	let year = timestamp.getFullYear();
	let yCount = 0;
	for (let ch of dateFormat) {
		if (ch === "y") {
			yCount++;
		}
	}
	if (yCount === 2) {
		year %= 100;
	}

	let currentDate = "";
	if (dateFormat.includes("M")) {
		const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		if (dateFormat === "Mddyyyy" || dateFormat === "Mddyy") {
			currentDate = `${monthNames[month]} ${date} , ${year}`;
		}else {
			let dateOrdinalSuffix;
			if (date%10 === 1 && date !== 11){
				dateOrdinalSuffix = "st";
			}else if (date%10 === 2 && date !== 12){
				dateOrdinalSuffix = "nd";
			}else if (date%10 === 3 && date !== 13){
				dateOrdinalSuffix = "rd";
			}else {
				dateOrdinalSuffix = "th";
			}
			currentDate = `${date}${dateOrdinalSuffix} of ${monthNames[month]} , ${year}`;
		}
	}else {
		if (date < 10) {
			date = prefixed0(1,date);
		}
		if (month+1 < 10) {
			month = prefixed0(1,month+1);
		}else {
			month = prefixed0(0,month+1);
		}
		if (dateFormat === "ddmmyyyy" || dateFormat === "ddmmyy") {
			currentDate = `${date} ${dateSeparator} ${month} ${dateSeparator} ${year}`;
		}else if (dateFormat === "mmddyyyy" || dateFormat === "mmddyy") {
			currentDate = `${month} ${dateSeparator} ${date} ${dateSeparator} ${year}`;
		}else {
			currentDate = `${year} ${dateSeparator} ${month} ${dateSeparator} ${date}`;
		}
	}

	if (showDay) {
		let day = timestamp.getDay();
		const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		currentDate += ` (${dayNames[day]})`;
	}

	let hour = timestamp.getHours();
	let timePeriodSuffix;
	if (timeFormat === "12-hour") {
		timePeriodSuffix = hour < 12 ? "AM" : "PM";
		hour = hour%12;
		if (!hour) {
			hour = 12;
		}
	}
	let minute = timestamp.getMinutes();
	let second = timestamp.getSeconds();
	if (hour < 10){
		hour = prefixed0(1,hour);
	}
	if (minute < 10){
		minute = prefixed0(1,minute);
	}
	if (second < 10){
		second = prefixed0(1,second);
	}

	let currentTime = `${hour} : ${minute} : ${second}`;

	if (showMS) {
		let milliSeconds = timestamp.getMilliseconds();
		if (milliSeconds < 10) {
		   	milliSeconds = prefixed0(2,milliSeconds);
		}else if (milliSeconds < 100) {
			milliSeconds = prefixed0(1,milliSeconds);
		}
		currentTime += ` . ${milliSeconds}`;
	}
	if (timeFormat === "12-hour") {
		currentTime += ' '+timePeriodSuffix;
	}
	if (showTimeZone) {
		const timeString = timestamp.toTimeString();
		const timeZone = timeString.slice(timeString.indexOf("("),timeString.length);
		currentTime += " "+timeZone;
	}

	return(
		<div id = "current-date-time-container">
			<div id = "display-container">
				<div className = "container-contents">
					<h3>Date</h3>
					<p className = "current-date-time">{currentDate}</p>
				</div>
				<div className = "container-contents">
					<h3>Time</h3>
					<p className = "current-date-time">{currentTime}</p>
				</div>
			</div>
			<div id = "options-container">
				<div className = "container-contents">
					<h3>Date Options:</h3>
					<CheckboxContainer label = "day" checked = {showDay} setChecked = {setShowDay} />
					<MuiSelect label = "Separator" options = {dateSeparators} setOption = {setDateSeparator} disabled = {disableDateSeparator} />
					<MuiSelect label = "Format" options = {dateFormats} setOption = {setDateFormat} disabled = {false} />
				</div>
				<div className = "container-contents">
					<h3>Time Options:</h3>
					<CheckboxContainer label = "milli-seconds" checked = {showMS} setChecked = {setShowMS} />
					<CheckboxContainer label = "timezone" checked = {showTimeZone} setChecked = {setShowTimeZone} />
					<MuiSelect label = "Format" options = {timeFormats} setOption = {setTimeFormat} disabled = {false} />
				</div>
			</div>
		</div>
	);
}

export default CurrentDateTime;