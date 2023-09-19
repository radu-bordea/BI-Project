import { useState, useEffect } from "react";
import axios from "axios";

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
      <hr style={{ width: "80%" }} />
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {types.map((device, index) => (
          <button key={index} style={{ marginRight: "10px" }}>
            {device.name}
          </button>
        ))}
      </div>
      <hr style={{ width: "80%" }} />
    </>
  );
  
}

export default Types;
