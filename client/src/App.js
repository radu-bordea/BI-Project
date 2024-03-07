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
import Types from "./Components/Types/Types";
import Devices from "./Components/Devices/Devices";
import Behives from "./Components/Behive/Behives";

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
  const [keepers, setKeepers] = useState([]);
  const [selectedKeeper, setSelectedKeeper] = useState(null);
  // types
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  // devices
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  // behives
  const [behives, setBehives] = useState([]);
  const [selectedBehive, setSelectedBehive] = useState(null);

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

  // Function to fetch types from the server
  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/types");
      const typeData = response.data.map((type) => ({
        _id: type._id,
        name: type.name,
        unit: type.unit,
        precision: type.precision,
      }));

      // Sort the typeData array by id before setting it in the state
      typeData.sort((a, b) => a._id.localeCompare(b._id));

      setTypes(typeData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(typeData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  // Function to fetch devices from the server
  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/devices");
      const deviceData = response.data.map((device) => ({
        _id: device._id,
        locationId: device.locationId,
        typeId: device.typeId,
        keeperId: device.keeperId,
        address: device.address,
        apiKey: device.apiKey
      }));

      // Sort the deviceData array by id before setting it in the state
      deviceData.sort((a, b) => a._id.localeCompare(b._id));

      setDevices(deviceData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(deviceData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  // Function to fetch behives from the server
  const fetchBehives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/behives");
      const behiveData = response.data.map((behive) => ({
        _id: behive._id,
        devicesIds: behive.devicesIds,
      }));

      // Sort the behiveData array by id before setting it in the state
      behiveData.sort((a, b) => a._id.localeCompare(b._id));

      setBehives(behiveData);
      setLoading(false); // Data has been fetched, set loading to false
      console.log(behiveData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchKeepers();
    fetchTypes();
    fetchDevices();
    fetchBehives();
  }, [selectedCity, selectedKeeper, selectedType, selectedDevice, selectedBehive]);

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
            <Route
              path="/types"
              component={() => (
                <Types
                  types={types}
                  setTypes={setTypes}
                  // selectedTypes={selectedType}
                  setSelectedType={setSelectedType}
                />
              )}
            />
            <Route
              path="/devices"
              component={() => (
                <Devices
                  devices={devices}
                  setDevices={setDevices}
                  // selectedDevices={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                />
              )}
            />
            <Route
              path="/behives"
              component={() => (
                <Behives
                  behives={behives}
                  setBehives={setBehives}
                  // selectedBehives={selectedBehives}
                  setSelectedBehive={setSelectedBehive}
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
