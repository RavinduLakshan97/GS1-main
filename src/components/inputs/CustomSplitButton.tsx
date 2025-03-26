/**
 * CustomSplitButton Component
 *
 * A split button component that displays a primary action button along with
 * a dropdown menu for additional actions. The primary button triggers the
 * first action in the provided options array, while the dropdown allows
 * selecting other actions.
 *
 * @author Shehan Chandrasekara
 * @created 2025-02-24
 *
 * @component
 *
 * @param {CustomSplitButtonProps} props - Component properties.
 * @param {OptionItem[]} props.options - Array of option items for the dropdown menu.
 * @param {string} props.buttonLabel - Label for the primary button.
 * @param {React.ComponentProps<typeof Button>} [props.buttonProps] - Additional props for the primary button.
 * @param {number[]} [props.disabledOptions] - Array of indices to disable specific menu items.
 *
 * @interface OptionItem
 * @property {string} label - The display label for the menu item.
 * @property {any} value - The value associated with the menu item.
 * @property {() => void} [action] - Optional function to execute when the menu item is selected.
 *
 * @interface CustomSplitButtonProps
 * @property {OptionItem[]} options - Array of option items for the dropdown menu.
 * @property {string} buttonLabel - Label for the primary button.
 * @property {React.ComponentProps<typeof Button>} [buttonProps] - Additional props for the primary button.
 * @property {number[]} [disabledOptions] - Array of indices to disable specific menu items.
 *
 * @example
 * <CustomSplitButton
 *   buttonLabel="Action"
 *   options={[
 *     { label: 'Option 1', value: 1, action: () => console.log('Option 1 clicked') },
 *     { label: 'Option 2', value: 2, action: () => console.log('Option 2 clicked') }
 *   ]}
 * />
 */

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

interface OptionItem {
  label: string;
  value: any;
  action?: () => void;
}

interface CustomSplitButtonProps {
  options: OptionItem[];
  buttonLabel: string | any;
  buttonProps?: React.ComponentProps<typeof Button>;
  disabledOptions?: number[];
}

const CustomSplitButton: React.FC<CustomSplitButtonProps> = ({
  options,
  buttonLabel,
  buttonProps = {},
  disabledOptions = [],
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const defaultButtonProps: React.ComponentProps<typeof Button> = {
    variant: "contained",
    color: "primary",
    sx: { height: "41px" },
    ...buttonProps,
  };

  const handleClick = () => {
    console.info(`Button clicked: ${buttonLabel}`);
    options[0]?.action?.();
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    options[index]?.action?.();
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        {...defaultButtonProps}
      >
        <Button onClick={handleClick} {...defaultButtonProps}>
          {buttonLabel}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select action"
          aria-haspopup="menu"
          onClick={handleToggle}
          {...defaultButtonProps}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      disabled={disabledOptions.includes(index)}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default CustomSplitButton;
