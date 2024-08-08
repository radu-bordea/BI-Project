import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Navbar,
  Home,
  About,
  Map,
  Footer,
  Locations,
  Keepers,
  Types,
  Devices,
  Beehives,
  LoginButton,
} from "./Components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify"; // import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import DataNew from "./Components/DataNew";

const App = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <Router className="container-fluid"  basename="/">
        <Navbar
          handleNavClick={handleNavClick}
          expanded={expanded}
          setExpanded={setExpanded}
          className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        />
        <br />
        <div className="switch">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/maps" component={Map} />
            <Route path="/data" component={DataNew} />
            <Route path="/locations" component={Locations} />
            <Route path="/keepers" component={Keepers} />
            <Route path="/types" component={Types} />
            <Route path="/devices" component={Devices} />
            <Route path="/beehives" component={Beehives} />
            <Route path="/login" component={LoginButton} />
          </Switch>

          <Footer className="fixed-bottom" />
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
