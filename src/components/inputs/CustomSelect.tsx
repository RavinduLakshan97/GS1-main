import React from "react";
import { Select, MenuItem, SelectProps } from "@mui/material";

const CustomSelect: React.FC<SelectProps> = (props) => {
  return (
    <Select {...props}>
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
    </Select>
  );
};

export default CustomSelect;
