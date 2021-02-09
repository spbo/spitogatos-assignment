import React from "react";
import mapImage from "../Images/map-image.png";
import Form from "./Form";

// render the 2 sections in home page
const Dashboard = () => {
  return (
    <div className="content-container">
      <div className="map-image">
        <img src={mapImage} alt="image of a map" />
      </div>
      <Form />
    </div>
  );
};

export default Dashboard;
