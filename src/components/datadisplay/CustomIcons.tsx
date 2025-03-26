import React from "react";
import { Icon } from "@mui/material";

const CustomIcons: React.FC<{ name: string }> = ({ name }) => {
  return <Icon>{name}</Icon>;
};

export default CustomIcons;
