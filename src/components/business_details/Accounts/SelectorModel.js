import React, { useEffect, useState } from "react";
import { getRoutes } from "../../../server_data/api";
import { useParams } from "react-router-dom";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectorModel = ({ onDateChange, onRouteChange, selectedRoute }) => {
  const { business_id } = useParams();
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getRoutes(business_id);
        console.log(data);
        if (data && Array.isArray(data)) {
          setRoutes(data);
        } else {
          setRoutes([]);
        }
      };

      fetchData();
    } catch (error) {}
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onDateChange(selectedDate); // Pass the selected date back to CreditBills
  };

  // Handle route selection
  const handleRouteChange = (event) => {
    const selectedRouteId = event.target.value;
    onRouteChange(selectedRouteId); // Pass the selected route ID back to CreditBills
  };

  return (
    <div className="w-96 border border-gray-400 p-4 ml-auto mr-auto mt-5 mb-8 rounded">
      {/* Date selection */}
      <div className="flex flex-row space-x-5 mb-4">
        <h1 className="font-serif">Select the Date:</h1>
        <input
          type="date"
          className="block w-32 border border-gray-300 p-2 rounded"
          onChange={handleDateChange}
        />
      </div>

      {/* Route selection */}
      <div className="flex flex-row space-x-5">
        <h1 className="font-serif">Select the Route:</h1>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Routes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRoute}
              label="Routes"
              onChange={handleRouteChange}
            >
              {routes.map((e) => (
                <MenuItem key={e.route_id} value={e.route_id}>
                  {e.route}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default SelectorModel;
