import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, MantineTheme } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "@mantine/core/styles.css";
import { EmployeeProvider } from "./EmployeeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          primaryColor: "blue",
          components: {
            NavLink: {
              styles: (theme: MantineTheme) => ({
                root: {
                  borderRadius: theme.radius.md,
                  "&:hover": {
                    backgroundColor: theme.colors.blue[0],
                  },
                },
              }),
            },
          },
        }}
      >
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
