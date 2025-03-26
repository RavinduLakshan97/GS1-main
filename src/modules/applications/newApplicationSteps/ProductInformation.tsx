import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setSecondaryPage } from "../../../redux/slices/pageSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { productInformationSchema } from "../../../utils/validations/railPartSchema";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  setRefresh,
  updateForm,
} from "../../../redux/slices/railPartSlice";
import { RootState } from "../../../redux/store";
import { CustomButton, CustomInput } from "../../../components/inputs";
import Stack from "@mui/material/Stack";
import ToSentenceCase from "../../../utils/ToSentenceCase";

import { SearchOutlined } from "@mui/icons-material";
import { defaultRailPart } from "../../../redux/constants/defaultRailPart";

type FormData = z.infer<typeof productInformationSchema>;

type ProductInformationProps = {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  totalSteps: number;
  handleReset: () => void;
};

const ProductInformation: React.FC<ProductInformationProps> = ({
  handleNext,
  handleBack,
  activeStep,
  totalSteps,
  handleReset,
}) => {
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.rail.railPart);

  const {
    control,

    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(productInformationSchema),
    defaultValues: formData || {},
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    dispatch(updateForm(data));
    handleNext();
  };

  useEffect(() => {
    console.log("FormData", formData);
    reset(formData);
  }, [formData, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ px: 5, mx: "auto" }}
    >
      <Grid container spacing={2}>
        {Object.entries(defaultRailPart)
          .filter(
            ([, metadata]) => metadata.step === (activeStep as number) + 1
          )
          .map(([key, metadata]) => {
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={key}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <CustomInput
                    name={key}
                    label={ToSentenceCase(key)}
                    control={control}
                    type={
                      metadata.entryType === "Default"
                        ? "text"
                        : metadata.entryType
                    }
                    error={errors[key as keyof FormData]}
                    required
                    disabled={metadata.entryType === "Default"}
                  />
                  {key === "baseUnitGTIN" && (
                    <CustomButton
                      onClick={() =>
                        dispatch(setSecondaryPage("assetRegistry"))
                      }
                      variant="contained"
                      color="primary"
                    >
                      <SearchOutlined />
                    </CustomButton>
                  )}
                </Stack>
              </Grid>
            );
          })}
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <CustomButton
          onClick={() => {
            dispatch(resetForm());
            // reset(formData);
          }}
          variant="contained"
          color="error"
        >
          Reset
        </CustomButton>
        <CustomButton
          onClick={handleBack}
          variant="contained"
          color="secondary"
          disabled={activeStep === 0}
        >
          Back
        </CustomButton>

        <CustomButton type="submit" variant="contained" color="primary">
          {activeStep === totalSteps - 1 ? "Finish" : "Next"}
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default ProductInformation;
