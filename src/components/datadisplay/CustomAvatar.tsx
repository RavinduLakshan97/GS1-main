import React from "react";
import { Avatar } from "@mui/material";

const CustomAvatar: React.FC<{ src?: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return <Avatar src={src} alt={alt} />;
};

export default CustomAvatar;
