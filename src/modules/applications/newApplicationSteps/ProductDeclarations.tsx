import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setSecondaryPage } from "../../../redux/slices/pageSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDeclarationsSchema } from "../../../utils/validations/railPartSchema";
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

type FormData = z.infer<typeof productDeclarationsSchema>;

const normalizedSchema = getNormalizedSchemaShape(productDeclarationsSchema);

type ProductDeclarationsProps = {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  totalSteps: number;
  handleReset: () => void;
};

const ProductDeclarations: React.FC<ProductDeclarationsProps> = ({
  handleNext,
  handleBack,
  activeStep,
  totalSteps,
  handleReset,
}) => {
  const dispatch = useDispatch();
  const { formData, refresh } = useSelector((state: RootState) => ({
    formData: state.rail.railPart,
    refresh: state.rail.refresh,
  }));

  const {
    control,

    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(productDeclarationsSchema),
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

export default ProductDeclarations;
