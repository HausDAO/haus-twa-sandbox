import React from "react";
import ReactDOM from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App.tsx";
import "./index.css";

WebApp.ready();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
