import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setSecondaryPage } from "../../../redux/slices/pageSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDatesSchema } from "../../../utils/validations/railPartSchema";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateForm } from "../../../redux/slices/railPartSlice";
import { RootState } from "../../../redux/store";
import { CustomButton, CustomInput } from "../../../components/inputs";
import Stack from "@mui/material/Stack";
import ToSentenceCase from "../../../utils/ToSentenceCase";
import { getNormalizedSchemaShape } from "../../../utils/normalizeSchema";
import { SearchOutlined } from "@mui/icons-material";
import { defaultRailPart } from "../../../redux/constants/defaultRailPart";

type FormData = z.infer<typeof productDatesSchema>;

const normalizedSchema = getNormalizedSchemaShape(productDatesSchema);
console.log(normalizedSchema);

type ProductDatesProps = {
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  activeStep: number;
  totalSteps: number;
};

const ProductDates: React.FC<ProductDatesProps> = ({
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productDatesSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    dispatch(updateForm(data));
    handleNext(); // Move to the next step on successful form submission
  };

  useEffect(() => {
    console.log("FormData", formData);
    reset(formData);
  }, [formData, reset]);
  console.log(errors);

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
                </Stack>
              </Grid>
            );
          })}
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <CustomButton
          onClick={() => {
            dispatch(resetForm());
            handleReset();
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

export default ProductDates;
