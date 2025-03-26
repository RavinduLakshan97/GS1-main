import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";

const CustomTooltip: React.FC<TooltipProps> = (props) => {
  return <Tooltip {...props}>{props.children}</Tooltip>;
};

export default CustomTooltip;
