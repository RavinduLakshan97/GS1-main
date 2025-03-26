import React from "react";
import { Fab, FabProps } from "@mui/material";

const CustomFAB: React.FC<FabProps> = (props) => {
  return <Fab {...props}>{props.children}</Fab>;
};

export default CustomFAB;
