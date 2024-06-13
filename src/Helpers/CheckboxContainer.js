import './CheckboxContainer.css';

const CheckboxContainer = ({ label,checked,setChecked }) => {

	return(
		<div className = "checkbox-container">
	      <input id = {`${label}-checkbox`} type = "checkbox" name = {`${label}-checkbox`} onChange = {() => setChecked(!checked)} />
	      <label htmlFor = {`${label}-checkbox`}>include {label}</label>
	    </div>
	);
}

export default CheckboxContainer;