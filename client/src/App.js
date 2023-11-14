import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/NavbarComponent";
import Home from "./Components/Home";
import About from "./Components/About";
import Data from "./Components/Data";
import Map from "./Components/MapPage/Map";
import "./App.css";
import Footer from "./Components/Footer";
import Locations from "./Components/Locations/Locations";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/Login/Login";

const App = () => {
  const { isAuthenticated } = useAuth0();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Function to fetch locations from the server
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
      const cityData = response.data.map((location) => ({
        _id: location._id,
        name: location.name,
        lat: location.lat,
        long: location.long,
      }));

      // Sort the cityData array by id before setting it in the state
      cityData.sort((a, b) => a._id.localeCompare(b._id));

      setCities(cityData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(cityData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedCity]);

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
        {loading ? (
          <div>Loading...</div> // Display a loading message
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route
              path="/maps"
              component={() => <Map cities={cities} setCities={setCities} />}
            />
            <Route path="/data" component={Data} />
            <Route
              path="/admin"
              component={() => (
                <Locations
                  cities={cities}
                  setCities={setCities}
                  selectedCities={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              )}
            />
            <Route path="/login" component={LoginButton} />
          </Switch>
        )}
        <Footer className="fixed-bottom" />
      </div>
    </Router>
  );
};

export default App;
