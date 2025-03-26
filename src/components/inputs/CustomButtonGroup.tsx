import React from "react";
import { ButtonGroup, Button, ButtonGroupProps } from "@mui/material";

const CustomButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return (
    <ButtonGroup {...props}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
};

export default CustomButtonGroup;
