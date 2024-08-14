import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const BusinessDashboard = () => {
  const location = useLocation();
  const propsFromLink = location.state;

  return (
    <div>
      <Header name={propsFromLink.name} id={propsFromLink.id} />
      <div className="text-center mt-10">
        <h1>
          This is a dashboard. Need to show overview of the stock, cheques, cash
          , credits, cheques for today etc
        </h1>
      </div>
    </div>
  );
};

export default BusinessDashboard;
