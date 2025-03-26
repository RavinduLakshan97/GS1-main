import React from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../redux/slices/themeSlice"; // Import Redux action
import { RootState } from "../redux/store"; // Ensure correct state type

const ColorPicker = ({
  colorKey,
}: {
  colorKey:
    | "primary"
    | "secondary"
    | "error"
    | "background"
    | "text"
    | "paper"
    | "textheadings";
}) => {
  const dispatch = useDispatch();

  // Get color from Redux store
  const color = useSelector((state: RootState) => state.theme.colors[colorKey]);

  const handleChangeComplete = (newColor: any) => {
    dispatch(setColor({ key: colorKey, value: newColor.hex })); // Dispatch action
  };

  return (
    <div className="flex flex-col items-center">
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      <p className="mt-2 text-sm">
        Selected {colorKey} Color:{" "}
        <span style={{ color, fontWeight: "bold" }}>{color}</span>
      </p>
    </div>
  );
};

export default ColorPicker;
