import React from "react";
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from "@mui/material";

const CustomToggleButton: React.FC<ToggleButtonGroupProps> = (props) => {
  return (
    <ToggleButtonGroup {...props}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;
