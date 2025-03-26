import React from "react";
import { Slider, SliderProps } from "@mui/material";

const CustomSlider: React.FC<SliderProps> = (props) => {
  return <Slider {...props} />;
};

export default CustomSlider;
