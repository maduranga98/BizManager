import React, { useEffect, useState } from "react";
import LoadingSheet from "./LoadingSheet";
import { useParams } from "react-router-dom";
import Unloading from "./Unloading";
import Details from "./Details";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getEmployees,
  getRoutes,
  markAttendence,
} from "../../../server_data/api"; // Assuming you have this API method
import CurrentDate from "../../../Modal/CurrentDate";
import TodaysCheques from "./MainDashboard/TodaysCheques";
import TodaysCreditBills from "./MainDashboard/TodaysCreditBills";

const MainDashBoard = (props) => {
  const { business_id } = useParams();
  const [mainPage, setmainPage] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [unloadingPage, setUnloadingPage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = React.useState("");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({}); // To store individual attendance status

  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getRoutes(business_id);
        if (data && Array.isArray(data)) {
          setRoutes(data);
        } else {
          setRoutes([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoutes();
  }, [business_id]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees(business_id);
        if (response && Array.isArray(response)) {
          setEmployees(response);
          // Initialize attendance to "Present" for all employees
          const initialAttendance = response.reduce((acc, employee) => {
            acc[employee.emp_id] = "Present";
            return acc;
          }, {});
          setAttendance(initialAttendance);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, [business_id]);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };
  const date = new Date();

  const toggleAttendance = async (emp_id) => {
    const newStatus = attendance[emp_id] === "Present" ? "Absent" : "Present";
    setAttendance((prev) => ({ ...prev, [emp_id]: newStatus }));

    // Send the updated attendance to the server
    try {
      await markAttendence(business_id, emp_id, date, newStatus);
    } catch (error) {
      console.error("Error updating attendance", error);
    }
  };

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

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;

  return (
    <div className="min-h-screen">
      <div className="w-150 bg-buttons text-chars text-xl p-3 pl-10 pr-10 flex flex-row justify-between">
        <div className="flex items-center space-x-2 text-xl hover:text-color1">
          <IoArrowBackCircleSharp />
          <button onClick={goBack} className="text-white">
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
          <div className="flex flex-row justify-between">
            <CurrentDate />
            <h1 className="text-xl font-serif font-bold text-black m-5">
              {name}
            </h1>
          </div>
          <div className="flex flex-row m-5">
            <h1>Select the Route: </h1>
            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Routes</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRoute}
                  label="Routes"
                  onChange={handleRouteChange}
                >
                  {routes.map((route) => (
                    <MenuItem key={route.route_id} value={route.route_id}>
                      {route.route}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="m-5 flex flex-row">
            <h1>Mark the Attendance: </h1>
            <table className="border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Person</th>
                  <th className="px-4 py-2 border">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td className="px-4 py-2 border">{employee.name}</td>
                    <td className="px-4 py-2 border">
                      <button onClick={() => toggleAttendance(employee.emp_id)}>
                        {attendance[employee.emp_id]}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row">
            <TodaysCheques
              business_id={business_id}
              route={selectedRoute}
              date={formattedDate}
            />
            <TodaysCreditBills
              business_id={business_id}
              route={selectedRoute}
              date={formattedDate}
            />
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
          <Unloading business_id={business_id} routeName={selectedRoute} />
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
