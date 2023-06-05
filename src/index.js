import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "http://localhost:3000/user",
  signOutRedirectURL: "http://localhost:3000/",
  clientID: "mggwJwJ0Wob9M161uzaWA8Yl1Pga",
  baseUrl: "https://api.asgardeo.io/t/org80k8n",
  scope: [ "openid","profile" ]
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider config={ config }>
    {
      <React.StrictMode>
        <App />
      </React.StrictMode>
    }
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
