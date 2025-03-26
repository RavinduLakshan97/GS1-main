import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete: React.FC<{ options: string[] }> = ({ options }) => {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Autocomplete" />}
    />
  );
};

export default CustomAutocomplete;
