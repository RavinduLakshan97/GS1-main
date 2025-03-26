import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

import { Box } from "@mui/material";
import { StepItem } from "../../utils/interfaces/stepItem";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(0 18 40) 0%, rgb(64 123 174) 50%, rgb(64 123 174) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(0 18 40) 0%, rgb(0 18 40) 50%, rgb(0 18 40) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "darkgray",
    borderRadius: 1,
    ...(theme.palette.mode === "dark" && {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "gray",
  zIndex: 1,
  color: "#fff",
  width: 35,
  height: 35,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(theme.palette.mode === "dark" && {
    backgroundColor: theme.palette.grey[700],
  }),
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(163 155 203) 0%, rgb(64 123 174) 50%, rgb(0 18 40) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(163 155 203) 0%, rgb(64 123 174) 50%, rgb(0 18 40) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps & { icon: React.ReactElement }) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {React.cloneElement(icon, { sx: { fontSize: 18 } })}
    </ColorlibStepIconRoot>
  );
}

const CustomStepLabel = styled(StepLabel)<StepLabelProps>(({ theme }) => ({
  "& .MuiStepLabel-label": {
    "&.Mui-disabled": {
      color: "gray",
      fontWeight: "bold",
    },
    "&.Mui-active": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    "&.Mui-completed": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
  },
}));

const CustomStepper: React.FC<{ steps: StepItem[] }> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const ActiveComponent = steps[activeStep].component;
  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack
      sx={{
        width: "100%",

        paddingBottom: 2,
        backgroundColor: "transparent",
        height: "100%",
      }}
      spacing={2}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          backgroundColor: "transparent",
          margin: 0,
          paddingTop: 0,
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <CustomStepLabel
              icon={
                <ColorlibStepIcon
                  active={index === activeStep}
                  completed={index < activeStep}
                  icon={step.icon}
                />
              }
            >
              {step.label}
            </CustomStepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          backgroundColor: "#e6eaec",
          margin: 0,
          flexGrow: 1,
          paddingTop: 2,
          paddingBottom: 2,
          overflowY: "auto",
          border: "1px solid #e6eaec",
          borderRadius: 2,
          // If you want horizontal scroll, also `overflowX: "auto"`.
          // backgroundColor: "transparent", // keep or remove as needed
        }}
      >
        {ActiveComponent && (
          <ActiveComponent
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            activeStep={activeStep}
            totalSteps={steps.length}
          />
        )}
      </Box>
    </Stack>
  );
};

export default CustomStepper;
