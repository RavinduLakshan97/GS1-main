import React from "react";
import { Typography, TypographyProps } from "@mui/material";

const CustomTypography: React.FC<TypographyProps> = (props) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export default CustomTypography;
