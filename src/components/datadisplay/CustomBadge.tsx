import React from "react";
import { Badge, BadgeProps } from "@mui/material";

const CustomBadge: React.FC<BadgeProps> = (props) => {
  return <Badge {...props}>{props.children}</Badge>;
};

export default CustomBadge;
