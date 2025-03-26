import React from "react";

export interface StepItem {
  label: string;
  icon: React.ReactElement;
  component: React.FC<{
    handleNext: () => void;
    handleBack: () => void;
    handleReset: () => void;
    activeStep: number;
    totalSteps: number;
  }>;
}
