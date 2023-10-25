import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Data.css";

const Data = () => {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/devices");
      setDevices(response.data); // Update to set the entire response.data array
      console.log(devices);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="container">
      <h3>Here are the Devices with the Graph!</h3>
      <hr />
      <div className="row">
        <div className="button-container col-md-2">
          {devices.map((device, index) => (
            <button className="btn btn-outline-info" key={index}>
              {device._id}
            </button>
          ))}
        </div>
        <div className="col-md-10 graph-container">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            optio autem rem ex illum soluta porro doloribus deleniti, quisquam
            tempore architecto recusandae repudiandae cupiditate modi omnis
            consectetur dolore labore? Delectus alias enim facere dolore ipsa,
            praesentium placeat aperiam quia fugiat, nobis obcaecati quaerat
            laborum voluptatibus libero vero, dolorum dicta explicabo eius
            totam. Autem id architecto blanditiis, unde sequi velit ducimus
            praesentium quo dolore, consequatur magnam labore deserunt aut fugit
            distinctio maxime omnis nam cum. Corporis exercitationem odit animi
            nesciunt. Autem, incidunt nemo. Dolorem, aliquid suscipit vel
            dolorum minus iure ullam cupiditate doloribus officiis
            exercitationem nobis nihil natus repellat corrupti soluta voluptate
            deleniti laborum architecto modi. Dicta assumenda itaque deleniti
            autem reiciendis quod asperiores quia molestias, minima rerum quam
            nemo odit voluptatem accusamus, qui illo totam voluptate quibusdam,
            in velit! Vel placeat laudantium consequuntur sunt delectus illo nam
            neque voluptate veniam, quo expedita aliquam voluptatum, sapiente
            laboriosam inventore officiis quos rerum optio non eaque aperiam
            alias, autem tenetur. Sint mollitia ratione aliquid quasi
            consequuntur blanditiis vero veritatis at molestiae voluptatum
            assumenda repudiandae est hic saepe omnis in, impedit modi autem
            tenetur sit labore odio ipsum ut praesentium. Alias inventore eos,
            suscipit adipisci soluta blanditiis fuga fugit mollitia vitae
            assumenda sequi! Provident.
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Data;
