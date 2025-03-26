/**
 * CustomInput Component
 *
 * A reusable input component that integrates with React Hook Form and Material-UI.
 * Supports various input types including text, number, datetime, checkbox, select, and boolean.
 * Automatically handles validation errors and displays helper text when needed.
 *
 * @author Shehan Chandrasekara
 * @date 2025-02-26
 *
 * @component
 *
 * @param {CustomInputProps} props - Component properties.
 * @param {string} props.name - The name of the input field (used by React Hook Form).
 * @param {string} props.label - The label displayed for the input field.
 * @param {Control<any>} props.control - The control object from React Hook Form.
 * @param {'text' | 'number' | 'datetime' | 'checkbox' | 'select' | 'boolean'} [props.type='text'] - The type of input.
 * @param {FieldError} [props.error] - Validation error object from React Hook Form.
 * @param {boolean} [props.required=false] - Whether the field is required.
 * @param {boolean} [props.fullWidth=true] - Whether the input should take the full width of its container.
 * @param {'small' | 'medium'} [props.size='small'] - Size of the input component.
 * @param {Option[]} [props.options=[]] - Array of options for select input type.
 *
 * @interface Option
 * @property {string} label - The display text for the option.
 * @property {string | number} value - The value associated with the option.
 *
 *
 */

import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type Option = {
  label: string;
  value: string | number;
};

type CustomInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  type?:
    | "text"
    | "number"
    | "datetime"
    | "checkbox"
    | "select"
    | "boolean"
    | "System Default";
  error?: FieldError;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  options?: Option[];
  disabled?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  control,
  type = "text",
  error,
  required = false,
  fullWidth = true,
  size = "small",
  options = [],
  disabled = false,
}) => {
  if (type === "datetime") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          render={({ field }) => (
            <DateTimePicker
              format="DD/MM/YYYY hh:mm a"
              {...field}
              label={label}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue: Dayjs | null) => {
                field.onChange(newValue ? newValue.toISOString() : "");
              }}
              disabled={disabled}
              slotProps={{
                textField: {
                  size,
                  error: !!error,
                  helperText: error?.message,
                  fullWidth,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  }

  if (type === "checkbox") {
    return (
      <FormControl error={!!error} component="fieldset" fullWidth={fullWidth}>
        <FormControlLabel
          control={
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={Boolean(field.value)}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={disabled}
                />
              )}
            />
          }
          label={label}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === "select") {
    return (
      <FormControl fullWidth={fullWidth} error={!!error} size={size}>
        <InputLabel>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          render={({ field }) => (
            <Select {...field} label={label} disabled={disabled}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === "boolean") {
    return (
      <FormControl fullWidth={fullWidth} error={!!error} size={size}>
        <InputLabel>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue={false}
              onChange={(e) => field.onChange(e.target.value === "true")}
              label={label}
              disabled={disabled}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          )}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    // <TextField
    //   label={label}
    //   type={type}
    //   {...control.register(name, { valueAsNumber: type === "number" })}
    //   error={!!error}
    //   helperText={error?.message}
    //   fullWidth={fullWidth}
    //   size={size}
    //   disabled={disabled}
    // />
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error?.message}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
        />
      )}
    />
  );
};

export default CustomInput;
