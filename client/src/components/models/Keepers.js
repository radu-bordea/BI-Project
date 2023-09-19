import { useState, useEffect } from "react";
import axios from "axios";
import './models.css'

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
      <hr  />
      <div >
        {keepers.map((keeper, index) => (
          <button key={index} >
            {keeper.firstName} {keeper.lastName}
          </button>
        ))}
      </div>
      <hr className="hr2-keepers"  />
    </>
  );
  
}

export default Keepers;
