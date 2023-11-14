import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container-login">
      <span className="loading" onClick={loginWithRedirect()}>
        We are executing loagin through the auth0 api
      </span>
    </div>
  );
};

export default LoginButton;
