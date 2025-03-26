import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CustomMaterialIcons: React.FC<SvgIconProps> = (props) => {
  return <SvgIcon {...props}>{props.children}</SvgIcon>;
};

export default CustomMaterialIcons;
