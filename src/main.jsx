import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#5A189A",
    800: "#7B2CBF",
    700: "#9D4EDD",
    600: "#C77DFF",
    500: "#E0AAFF",
  },
  secondary: {
    500: "#FECACA",
    400: "#F9A8D4",
    300: "#C4B5FD",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
