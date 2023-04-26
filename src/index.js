import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider
    config={{
      signInRedirectURL: "http://localhost:3000/user",
      signOutRedirectURL: "http://localhost:3000",
      clientID: "mggwJwJ0Wob9M161uzaWA8Yl1Pga",
      baseUrl: "https://api.asgardeo.io/t/org80k8n",
      scope: ["openid", "profile"],
    }}
  >
    {
      <React.StrictMode>
        <App />
      </React.StrictMode>
    }
  </AuthProvider>
);

reportWebVitals();
