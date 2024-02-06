import React from "react";
import AppRoutes from "./routes";
import { ThemeProvider } from "./theme";
import { useSelector } from "react-redux";
import './App.scss'

const App = () => {
  const { theme } = useSelector((store) => store.layout);
  return (
    <div data-theme={theme}>
      <ThemeProvider>
        <AppRoutes></AppRoutes>
      </ThemeProvider>
    </div>
  );
};


export default App;
