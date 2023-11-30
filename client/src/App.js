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
import axios from "axios";

import Locations from "./Components/Locations/Locations";
import Keepers from "./Components/Keepers/Keepers";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/Login/Login";

const App = () => {
  const { isAuthenticated } = useAuth0();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  // cities
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  // keepers
  const [keepers, setKeepers] = useState();
  const [selectedKeeper, setSelectedKeeper] = useState(null);

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

  // Function to fetch keepers from the server
  const fetchKeepers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/keepers");
      const keeperData = response.data.map((keeper) => ({
        _id: keeper._id,
        firstName: keeper.firstName,
        lastName: keeper.lastName,
        email: keeper.email,
        phone: keeper.phone,
      }));

      // Sort the keeperData array by id before setting it in the state
      keeperData.sort((a, b) => a._id.localeCompare(b._id));

      setKeepers(keeperData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(keeperData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };
  
  useEffect(() => {
    fetchLocations();
    fetchKeepers();
  }, [selectedCity, selectedKeeper]);

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
            <Route path="/maps" component={() => <Map cities={cities} />} />
            <Route path="/data" component={Data} />
            <Route
              path="/locations"
              component={() => (
                <Locations
                  cities={cities}
                  setCities={setCities}
                  // selectedCities={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              )}
            />
            <Route
              path="/keepers"
              component={() => (
                <Keepers
                  keepers={keepers}
                  setKeepers={setKeepers}
                  // selectedKeepers={selectedKeeper}
                  setSelectedKeeper={setSelectedKeeper}
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
