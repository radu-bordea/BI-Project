import { useState, useEffect } from "react";
import axios from "axios";

function Keepers() {
  const [keepers, setKeepers] = useState([]);

  const fetchKeepers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/keepers");
      setKeepers(response.data); // Update to set the entire response.data array
      console.log(keepers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchKeepers();
  }, []);

  return (
    <>
      <hr style={{ width: "70%" }} />
      <div style={{ width:"60%", margin: "auto", overflowX: "auto", whiteSpace: "nowrap" }}>
        {keepers.map((keeper, index) => (
          <button key={index} style={{ marginRight: "10px" }}>
            {keeper.firstName} {keeper.lastName}
          </button>
        ))}
      </div>
      <hr style={{ width: "70%" }} />
    </>
  );
  
}

export default Keepers;
