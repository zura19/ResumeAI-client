import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./components/providers/ReactQueryProvider.tsx";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./components/providers/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>

      <Toaster />
    </ReactQueryProvider>
  </StrictMode>
);
