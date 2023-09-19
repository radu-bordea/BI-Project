import { useState, useEffect } from "react";
import axios from "axios";
import './models.css'

function Types() {
  const [types, setTypes] = useState([]);

  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/types");
      setTypes(response.data); // Update to set the entire response.data array
      console.log(types);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      <hr />
      <div >
        {types.map((device, index) => (
          <button  key={index} >
            {device.name}
          </button>
        ))}
      </div>
      <hr className="hr2"  />
    </>
  );
  
}

export default Types;
