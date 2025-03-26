import React from "react";
import CustomStepper from "../../components/navigation/CustomStepper";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  ProductInformation,
  ProductHierarchy,
  ProductDates,
  ProductDeclarations,
  ProductApplicationReview,
} from "./newApplicationSteps";

import { StepItem } from "../../utils/interfaces/stepItem";
const NewApplication: React.FC = () => {
  console.log("NewApplication Renders");
  const steps: StepItem[] = [
    {
      label: "Product Information",
      icon: <SettingsIcon />,
      component: ProductInformation,
    },
    {
      label: "Product Hierarchy",
      icon: <GroupAddIcon />,
      component: ProductHierarchy,
    },
    {
      label: "Dates",
      icon: <VideoLabelIcon />,
      component: ProductDates,
    },
    {
      label: "Declarations",
      icon: <VideoLabelIcon />,
      component: ProductDeclarations,
    },
    {
      label: "Review & Submit",
      icon: <CheckCircleIcon />,
      component: ProductApplicationReview,
    },
  ];
  return <CustomStepper steps={steps} />;
};

export default NewApplication;
