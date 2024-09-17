import React, { useEffect, useState } from "react";
import { getEmployees } from "../../../../server_data/api";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EmployeeSelector = (props) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Initialize as a string

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployees(props.id);
      if (response && Array.isArray(response)) {
        setEmployees(response);
      } else {
        setEmployees([]);
      }
    };
    fetchData();
  }, [props.id]);

  const handleRouteChange = (event) => {
    setSelectedEmployee(event.target.value);
    props.onEmployeeSelect(event.target.value);
    console.log(selectedEmployee);
  };

  return (
    <div>
      <div className="flex flex-row m-5">
        <h1>Select the Employee: </h1>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedEmployee}
              label="Employee"
              onChange={handleRouteChange}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.emp_id} value={employee.emp_id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default EmployeeSelector;
