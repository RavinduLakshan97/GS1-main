import React from "react";
import { Chip, ChipProps } from "@mui/material";

const CustomChip: React.FC<ChipProps> = (props) => {
  return <Chip {...props} />;
};

export default CustomChip;
