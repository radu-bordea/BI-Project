import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Content from "./components/Content";
import Footer from "./components/Footer"
import "./App.css";

import MainNavigation from "./components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <div className="App">
        <MainNavigation />
        <main>
          <Switch>

            <Route path="/content">
              <Content />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
