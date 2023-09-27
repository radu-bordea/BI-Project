import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";


import Content from "./components/Content";
import Footer from "./components/Footer";
import "./App.css";

import MainNavigation from "./components/Navigation/MainNavigation";


function App() {
  return (
    <Router>
      <div className="App">
        <MainNavigation />
        <main>
          <Switch>
            <Router path="/users">
            </Router>
            <Router path="/content">
              <Content />
            </Router>
            <Router path="/login">
            </Router>
            <Router path="/">
              <Redirect to="/" />
            </Router>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
