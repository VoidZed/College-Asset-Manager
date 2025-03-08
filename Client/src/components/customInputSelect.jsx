import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["Option 1", "Option 2", "Option 3"];

const CustomInputSelect=()=> {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => (
        <TextField {...params} label="Select or type your option" variant="outlined" />
      )}
    />
  );
}

export default CustomInputSelect;