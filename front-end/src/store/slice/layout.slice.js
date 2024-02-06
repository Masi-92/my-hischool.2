import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "layout",
  initialState: {
    direction: localStorage.getItem("direction") || "ltr",
    theme: localStorage.getItem("theme") || "light",
  },
  reducers: {
    changeLayout: (state, action) => {
      state.direction = action.payload;
      localStorage.setItem("direction", action.payload);
      document.dir = action.payload;
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    },
  },
});

export const { changeLayout,toggleTheme } = slice.actions;

export default slice.reducer;
