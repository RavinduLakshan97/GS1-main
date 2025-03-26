import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const CustomRadioGroup: React.FC = () => {
  return (
    <RadioGroup>
      <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
      <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
    </RadioGroup>
  );
};

export default CustomRadioGroup;
