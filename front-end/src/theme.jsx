import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useSelector } from "react-redux";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function Rtl(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export function ThemeProvider({ children }) {
  const { direction, theme: themeMode } = useSelector((store) => store.layout);

  const theme = createTheme({
    direction: direction,
    palette: {
      mode: themeMode,
    },
    typography: {
      h1: {
        color: themeMode === "light" ? "#333" : "#ccc",
        fontSize: "2rem",
        marginBottom: "1rem",
      },
    },
  });

  if (direction === "ltr")
    return (
      <div dir="ltr">
        <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
      </div>
    );

  return (
    <div dir="rtl">
      <MaterialThemeProvider theme={theme}>
        <Rtl>{children}</Rtl>
      </MaterialThemeProvider>
    </div>
  );
}
