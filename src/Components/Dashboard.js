import React from "react";
import mapImage from "../Images/Image 2.png";
import Form from "./Form";

// render dashboard which contains an image and a form
const Dashboard = () => {
  return (
    <div className="content-container">
      <div className="map-image" src={mapImage} alt="image of a map"></div>
      <Form />
    </div>
  );
};

export default Dashboard;
