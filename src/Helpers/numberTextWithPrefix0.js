const prefixed0 = (count,value) => {
	let newText = '';
	for (let i = 0; i < count; i++) {
		newText += '0';
	}
	newText += value;
	return newText;
}

export default prefixed0;