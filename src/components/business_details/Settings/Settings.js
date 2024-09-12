import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MdPeople } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TbRouteScan } from "react-icons/tb";
import Employee from "./employee/Employee";
import { Divider } from "@mui/material";
import Vehicle from "./vehicle/Vehicle";
import Route from "./routes/Route";
const Settings = () => {
  const { business_id } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("employees");

  const goBack = () => {
    navigate(-1);
  };

  const onAddWorker = () => {
    setCurrentView("employees");
  };

  const onAddVehicles = () => {
    setCurrentView("vehicles");
  };
  const onAddRoutes = () => {
    setCurrentView("routes");
  };
  return (
    <div className="flex">
      <div className="w-64 bg-bag text-chars h-screen flex flex-col justify-between">
        <div className="flex flex-col items-start p-5 space-y-4">
          <h1 className="text-xl font-serif font-semibold text-color1">
            BizManager
          </h1>

          <div
            className={`flex items-center space-x-2 text-xl hover:text-color1 ${
              currentView === "employees" ? "text-color1 bg-selectedColor" : ""
            }`}
          >
            <MdPeople />
            <button onClick={onAddWorker} className="text-white">
              Employees
            </button>
          </div>

          <div
            className={`flex items-center space-x-2 text-xl hover:text-color1 ${
              currentView === "vehicles" ? "text-color1 bg-selectedColor" : ""
            }`}
          >
            <FaTruck />
            <button onClick={onAddVehicles} className="text-white ">
              Vehicles
            </button>
          </div>
          <div
            className={`flex items-center space-x-2 text-xl hover:text-color1 ${
              currentView === "routes" ? "text-color1 bg-selectedColor" : ""
            }`}
          >
            <TbRouteScan />
            <button onClick={onAddRoutes} className="text-white ">
              Routes
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xl hover:text-color1">
            <IoArrowBackCircleSharp />
            <button onClick={goBack} className="text-white ">
              Back
            </button>
          </div>
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="flex-1 p-6">
        {currentView === "employees" && <Employee id={business_id} />}
        {currentView === "vehicles" && <Vehicle id={business_id} />}
        {currentView === "routes" && <Route id={business_id} />}
      </div>
    </div>
  );
};

export default Settings;
