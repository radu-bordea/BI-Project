import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
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

  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname);
  }, [location]);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Router className="container-fluid">
      <Navbar
        handleNavClick={handleNavClick}
        expanded={expanded}
        setExpanded={setExpanded}
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      />
      <div className="switch">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/maps" component={Map} />
          <Route path="/data" component={Data} />
          <Route path="/locations" component={Locations} />
          <Route path="/keepers" component={Keepers} />
          <Route path="/types" component={Types} />
          <Route path="/devices" component={Devices} />
          <Route path="/behives" component={Behives} />
          <Route path="/login" component={LoginButton} />
        </Switch>

        <Footer className="fixed-bottom" />
      </div>
    </Router>
  );
};

export default App;
