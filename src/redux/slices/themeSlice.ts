import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    error: string;
    background: string;
    paper: string;
    text: string;
    textheadings: string;
  };
}

const initialState: ThemeState = {
  mode: "light",
  colors: {
    primary: "#737771",
    secondary: "#559b4d",
    error: "#FF0000",
    background: "#dacbcb",
    paper: "#cfdbc1",
    text: "#233f23",
    textheadings: "#000000",
  },
};

const updateThemeClass = (mode: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      updateThemeClass(state.mode);
    },
    setColor: (
      state,
      action: PayloadAction<{ key: keyof ThemeState["colors"]; value: string }>
    ) => {
      state.colors[action.payload.key] = action.payload.value;
    },
  },
});

export const { toggleTheme, setColor } = themeSlice.actions;
export default themeSlice.reducer;
