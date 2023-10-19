// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/NavbarComponent";
import Home from "./Components/Home";
import About from "./Components/About";
import Data from "./Components/Data";
import Map from "./Components/Map";
import "./App.css";
import Footer from "./Components/Footer";

const App = () => {
  const [expanded, setExpanded] = useState(false);

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
          <Route path="/data" component={Data} />
          <Route path="/maps" component={Map} />
        </Switch>
        <Footer className="fixed-bottom"/>
      </div>
    </Router>
  );
};

export default App;
