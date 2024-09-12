import React, { useEffect, useState } from "react";
import SelectorModel from "./SelectorModel";
import { getCreditBillsByDateAndRoute } from "../../../server_data/api";
import { useParams } from "react-router-dom";

const CreditBills = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedBills, setSelectedBills] = useState();

  const { business_id } = useParams();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const handleRouteChange = (routeId) => {
    setSelectedRoute(routeId);
    console.log(routeId);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responce = await getCreditBillsByDateAndRoute(
          business_id,
          selectedRoute,
          selectedDate
        );
        console.log(responce);
        setSelectedBills(JSON.stringify(responce, null, 2));
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [selectedDate, selectedRoute]);
  return (
    <div>
      <div>
        <SelectorModel
          selectedRoute={selectedRoute}
          onDateChange={handleDateChange}
          onRouteChange={handleRouteChange}
        />
      </div>
      <h1>{selectedBills}</h1>
    </div>
  );
};

export default CreditBills;
