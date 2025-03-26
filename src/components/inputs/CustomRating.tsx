import React from "react";
import { Rating, RatingProps } from "@mui/material";

const CustomRating: React.FC<RatingProps> = (props) => {
  return <Rating {...props} />;
};

export default CustomRating;
