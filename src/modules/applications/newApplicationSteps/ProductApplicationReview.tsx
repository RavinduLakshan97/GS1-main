import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { CustomButton } from "../../../components/inputs";
import Stack from "@mui/material/Stack";
import { resetForm } from "../../../redux/slices/railPartSlice";
import { addApplication } from "../../../redux/slices/assetApplicationsSlice";
import { railPartSchema } from "../../../utils/validations/railPartSchema";

// Utility to make the key more readable
function startCase(str: string) {
  return str
    .replace(/[_-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, (s) => s.toUpperCase());
}

type ProductApplicationReviewProps = {
  handleBack: () => void;
  handleReset: () => void;
  activeStep: number;
};

const ProductApplicationReview: React.FC<ProductApplicationReviewProps> = ({
  handleBack,
  handleReset,
  activeStep,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.rail.railPart);

  // Format value helper
  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    if (typeof value === "boolean") {
      // Choose the wording you prefer
      return value ? "Yes" : "No";
    }
    return String(value);
  };

  // Final submission
  const handleSubmit = () => {
    console.log("Form submitted successfully:", formData);
    alert("Form submitted successfully!");

    const validationResult = railPartSchema.safeParse(formData);

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.format());
      return; // Stop execution if validation fails
    }

    // If valid, proceed with dispatch
    dispatch(addApplication({ ...formData, applicationStatus: "pending" }));

    dispatch(resetForm());
    handleReset();
  };
  useEffect(() => {}, [formData]);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography sx={{ color: "primary.main" }} variant="h4" gutterBottom>
        Review Your Application
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ color: "primary.main" }}
        gutterBottom
      >
        Please review the details below before submitting.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <List>
        {/* Two-column layout using Grid */}
        <Grid container spacing={2}>
          {Object.entries(formData).map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6 }} key={key}>
              <ListItem disablePadding>
                <ListItemText
                  primary={startCase(key)}
                  secondary={formatValue(value)}
                  // Override text colors with sx
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "black",
                      fontWeight: "bold",
                    },
                    "& .MuiListItemText-secondary": {
                      color: "primary.main",
                    },
                  }}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>

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
        <CustomButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit Application
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default ProductApplicationReview;
