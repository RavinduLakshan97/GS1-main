import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RailPart,
  railPartSchema,
} from "../../utils/validations/railPartSchema";
import initialAssets from "../constants/dummyApplications.json";

type ExtendedRailPart = Partial<RailPart> & {
  applicationStatus?: string;
};

interface assetApplicationState {
  assets: ExtendedRailPart[];
}

const initialState: assetApplicationState = {
  assets: railPartSchema.array().parse(initialAssets),
};

const assetApplicationsSlice = createSlice({
  name: "assetApplications",
  initialState,
  reducers: {
    addApplication: (state, action: PayloadAction<ExtendedRailPart>) => {
      state.assets.push(action.payload);
    },
    removeApplication: (state, action: PayloadAction<ExtendedRailPart>) => {
      state.assets = state.assets.filter(
        (asset) => asset.baseUnitGTIN !== action.payload.baseUnitGTIN
      );
    },
    updateApplication: (state, action: PayloadAction<ExtendedRailPart>) => {
      const index = state.assets.findIndex(
        (asset) => asset.baseUnitGTIN === action.payload.baseUnitGTIN
      );
      if (index !== -1) {
        state.assets[index] = {
          ...state.assets[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addApplication, removeApplication, updateApplication } =
  assetApplicationsSlice.actions;
export default assetApplicationsSlice.reducer;
