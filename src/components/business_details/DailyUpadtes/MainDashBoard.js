import React, { useEffect, useState } from "react";
import LoadingSheet from "./LoadingSheet";
import { useParams } from "react-router-dom";
import Unloading from "./Unloading";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getRoutes } from "../../../server_data/api";

const MainDashBoard = () => {
  const { business_id } = useParams();
  const [mainPage, setmainPage] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [unloadingPage, setUnloadingPage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = React.useState("");

  const navigate = useNavigate();

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

  const onMainHandler = (event) => {
    event.preventDefault();
    setmainPage(true);
    setLoadingPage(false);
    setUnloadingPage(false);
    setDetailsPage(false);
  };
  const onLoadingHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(true);
    setUnloadingPage(false);
    setDetailsPage(false);
  };
  const onUnloadingHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(false);
    setUnloadingPage(true);
    setDetailsPage(false);
  };
  const onDetailsHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(false);
    setUnloadingPage(false);
    setDetailsPage(true);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedRoute(event.target.value);
    console.log(selectedRoute);
  };
  const goBack = () => {
    navigate(-1);
  };

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const formattedDate = `${year}-${month} -${day}`;
  return (
    <div className="min-h-screen">
      <div className="w-150 bg-buttons text-chars text-xl p-3 pl-10 pr-10 flex flex-row justify-between ">
        <div className="flex items-center space-x-2 text-xl hover:text-color1">
          <IoArrowBackCircleSharp />
          <button onClick={goBack} className="text-white ">
            Back
          </button>
        </div>
        <button onClick={onMainHandler}>Main</button>
        <button onClick={onLoadingHandler}>Loading</button>
        <button onClick={onUnloadingHandler}>Unloading</button>
        <button onClick={onDetailsHandler}>Full Report</button>
      </div>
      {mainPage && (
        <div>
          <div className="flex flex-row justify-between m-5">
            <h1>{formattedDate}</h1>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Routes</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRoute}
                  label="Routes"
                  onChange={handleChange}
                >
                  {routes.map((e) => (
                    <MenuItem key={e.route_id} value={e.route_id}>
                      {e.route}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <h3>Business Name</h3>
          </div>
          <div>
            <p>
              Need to show the total cash, cheques, credits , credits received,
              etc
            </p>
          </div>
        </div>
      )}
      {loadingPage && (
        <div>
          <LoadingSheet id={business_id} routeName={selectedRoute} />
        </div>
      )}
      {unloadingPage && (
        <div>
          <Unloading id={business_id} routeName={selectedRoute} />
        </div>
      )}
      {detailsPage && (
        <div>
          <Details id={business_id} routeName={selectedRoute} />
        </div>
      )}
    </div>
  );
};

export default MainDashBoard;
