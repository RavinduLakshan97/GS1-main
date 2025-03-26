import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  Typography,
} from "@mui/material";
import { CustomButton } from "../inputs";

interface GenericDialogProps extends Omit<DialogProps, "open" | "onClose"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  dismiss?: {
    escapeKey?: boolean; // Control Escape key dismissal
    outsidePress?: boolean; // Control outside click dismissal
  };
}

const CustomDialog: React.FC<GenericDialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "xl",
  dismiss = { escapeKey: false, outsidePress: false },
  ...dialogProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" && !dismiss.outsidePress) return;
        if (reason === "escapeKeyDown" && !dismiss.escapeKey) return;
        onClose();
      }}
      maxWidth={maxWidth}
      fullWidth
      disableEscapeKeyDown={!dismiss.escapeKey}
      {...dialogProps}
    >
      {title && (
        <DialogTitle>
          <Typography
            color="primary"
            sx={{ fontWeight: "bold" }}
            // sx={{ color: (theme) => theme.palette.primary.main }}
            variant="h5"
          >
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions || (
          <CustomButton onClick={onClose} variant="contained">
            Close
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
