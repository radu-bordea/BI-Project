import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="btn btn-primary" onClick={loginWithRedirect()}>
      Login
    </button>
  );
};

export default LoginButton;
