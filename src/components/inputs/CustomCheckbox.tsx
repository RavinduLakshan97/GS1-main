import React from "react";
import { Checkbox, FormControlLabel, CheckboxProps } from "@mui/material";

const CustomCheckbox: React.FC<CheckboxProps & { label?: string }> = ({ label, ...props }) => {
  return <FormControlLabel control={<Checkbox {...props} />} label={label || "Checkbox"} />;
};

export default CustomCheckbox;
