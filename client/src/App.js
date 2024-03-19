import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from './Components/Route';
import {
  Navbar,
  Home,
  About,
  Data,
  Map,
  Footer,
  Locations,
  Keepers,
  Types,
  Devices,
  Behives,
  LoginButton,
} from "./Components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <div className="container-fluid">
      <Navbar
        handleNavClick={handleNavClick}
        expanded={expanded}
        setExpanded={setExpanded}
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      />
      <div className="switch">

          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/maps">
            <Map />
          </Route>
          <Route path="/data">
            <Data />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/keepers">
            <Keepers />
          </Route>
          <Route path="/types">
            <Types />
          </Route>
          <Route path="/devices">
            <Devices />
          </Route>
          <Route path="/behives">
            <Behives />
          </Route>
          <Route path="/login">
            <LoginButton />
          </Route>

        <Footer className="fixed-bottom" />
      </div>
    </div>
  );
};

export default App;
