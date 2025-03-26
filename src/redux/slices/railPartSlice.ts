import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RailPart } from "../../utils/validations/railPartSchema";
import { defaultRailPartValues } from "../constants/defaultRailPart";

interface RailPartState {
  railPart: Partial<RailPart>;
  refresh: boolean;
}

const initialState: RailPartState = {
  railPart: defaultRailPartValues,
  refresh: true,
};

const railPartSlice = createSlice({
  name: "rail",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<RailPart>>) => {
      console.log("Updating form with:", action.payload);
      state.railPart = { ...state.railPart, ...action.payload };
    },
    resetForm: (state) => {
      state.railPart = initialState.railPart;
      state.refresh = !state.refresh;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { updateForm, resetForm, setRefresh } = railPartSlice.actions;
export default railPartSlice.reducer;
