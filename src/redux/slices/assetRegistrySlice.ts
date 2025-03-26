import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RailPart,
  railPartSchema,
} from "../../utils/validations/railPartSchema";
import initialAssets from "../constants/dummy.json";

interface AssetRegistryState {
  assets: RailPart[];
}

const initialState: AssetRegistryState = {
  assets: railPartSchema.array().parse(initialAssets),
};

const assetRegistrySlice = createSlice({
  name: "assetRegistry",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<RailPart>) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<RailPart>) => {
      state.assets = state.assets.filter(
        (asset) => asset.baseUnitGTIN !== action.payload.baseUnitGTIN
      );
    },
    updateAsset: (state, action: PayloadAction<RailPart>) => {
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

export const { addAsset, removeAsset, updateAsset } =
  assetRegistrySlice.actions;
export default assetRegistrySlice.reducer;
