import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

const queryClient= new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
