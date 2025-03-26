import React from "react";
import { Switch, FormControlLabel, SwitchProps } from "@mui/material";

const CustomSwitch: React.FC<SwitchProps & { label?: string }> = ({ label, ...props }) => {
  return <FormControlLabel control={<Switch {...props} />} label={label || "Switch"} />;
};

export default CustomSwitch;
