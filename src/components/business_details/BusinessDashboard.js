import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { CiSettings } from "react-icons/ci";

const BusinessDashboard = () => {
  const location = useLocation();
  const propsFromLink = location.state;

  return (
    <div>
      <Header name={propsFromLink.name} id={propsFromLink.id} />
      <div className="flex items-center w-24 bg-chars rounded space-x-2 text-xl text-bag m-10 font-serif shadow-sm hover:text-color1">
        <CiSettings />
        <Link to={`/settings/${propsFromLink.id}`}>Settings</Link>
      </div>

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
