import { useState, useEffect } from "react";
import axios from "axios";
import "./models.css";

function Types() {
  const [types, setTypes] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const fetchTypes = async () => {
    try {
      const response = await axios.get("https://bi-project.onrender.com/types");
      setTypes(response.data); // Update to set the entire response.data array
      console.log(types);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <hr />
      <div>
        {types.map((type) => (
          <button key={type._id}>{type.name}</button>
        ))}
      </div>
    </>
  );
}

export default Types;
