import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
// import 'dotenv/config'
import { NavigationProvider } from "./context/navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-pv2xi15d0b5uo74g.us.auth0.com"
    clientId="5JfhSt28v5rnxvC1KescHyaaqTH0bTXz"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <NavigationProvider> {/* Providing navigation context */}
      <App />
    </NavigationProvider>
  </Auth0Provider>
);
