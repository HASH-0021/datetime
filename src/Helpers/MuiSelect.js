import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MuiSelect({ label,options,setOption,disabled }) {
  const [value, setValue] = React.useState(options[0]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setOption(event.target.value);
  };

  return (
    <Box sx={{ m: "15px auto",width: 150 }}>
      <FormControl fullWidth disabled = {disabled}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
