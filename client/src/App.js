// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/NavbarComponent';
import Home from './Components/Home';
import About from './Components/About';
import Data from './Components/Data';
import Map from './Components/Map';
import './App.css';

const App = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Router>
      <div className='container'>
        <Navbar
          handleNavClick={handleNavClick}
          expanded={expanded}
          setExpanded={setExpanded}
        />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/data" component={Data} />
          <Route path="/maps" component={Map} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
