import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./common/AuthContext";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <React.StrictMode>
    <ErrorBoundary>

      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      </ErrorBoundary>

    </React.StrictMode>
  </div>
);
