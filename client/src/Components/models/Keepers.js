import { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

function Keepers() {
  const [keepers, setKeepers] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const fetchKeepers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/keepers");
      setKeepers(response.data); // Update to set the entire response.data array
      console.log(keepers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchKeepers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <hr />
      <div>
        {keepers.map(keeper => (
          <button key={keeper._id}>
            {keeper.firstName} {keeper.lastName}
          </button>
        ))}
      </div>
    </>
  );
}

export default Keepers;
