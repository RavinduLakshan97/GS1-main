import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import pageReducer from "./slices/pageSlice";
import railPartReducer from "./slices/railPartSlice";
import assetRegistryReducer from "./slices/assetRegistrySlice";
import assetApplicationReducer from "./slices/assetApplicationsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  page: pageReducer,
  rail: railPartReducer,
  assets: assetRegistryReducer,
  applications: assetApplicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
