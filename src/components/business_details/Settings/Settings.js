import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddVehicle from "./AddVehicle";
import AddWorkers from "./AddWorkers";
import { MdPeople } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Settings = () => {
  const { business_id } = useParams();
  const navigate = useNavigate();

  const [workers, setWorkers] = useState(false);
  const [vehicles, setVehicles] = useState(false);
  const closeForm = () => {
    setWorkers(false);
    setVehicles(false);
  };

  const goBack = () => {
    navigate(-1);
  };
  const onAddWorker = () => {
    setWorkers(true);
    setVehicles(false);
  };
  const onAddVehicles = () => {
    setVehicles(true);
    setWorkers(false);
  };
  return (
    <div>
      <div className="flex flex-row space-x-3">
        <div className="flex items-center space-x-2 text-xl">
          <IoArrowBackCircleSharp />
          <button onClick={goBack}>Back</button>
        </div>
        <div className="flex items-center space-x-2 text-xl">
          <MdPeople />
          <button onClick={onAddWorker}>Add workers</button>
        </div>
        <div className="flex items-center space-x-2 text-xl">
          <FaTruck />
          <button onClick={onAddVehicles}>Add vehicles</button>
        </div>
      </div>
      {vehicles && <AddVehicle id={business_id} onClose={closeForm} />}
      {workers && <AddWorkers id={business_id} onClose={closeForm} />}
    </div>
  );
};

export default Settings;
