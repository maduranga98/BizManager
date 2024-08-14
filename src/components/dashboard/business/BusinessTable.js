import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const BusinessTable = (props) => {
  const navigate = useNavigate();

  function createData(business_id, business_name, address, details) {
    return { business_id, business_name, address, details };
  }

  let parsedData = [];
  try {
    parsedData = JSON.parse(props.data);
  } catch (error) {
    console.error("Failed to parse props.data:", error);
  }

  const isValidData = Array.isArray(parsedData) && parsedData.length > 0;

  const rows = isValidData
    ? parsedData.map((e) =>
        createData(e.business_id, e.business_name, e.address, e.details)
      )
    : [];

  if (!isValidData) {
    return <div>No valid data available. Please check the data format.</div>;
  }

  const handleClick = (business_id, business_name) => () => {
    const propsToPass = { id: business_id, name: business_name };
    console.log(propsToPass);
    navigate("/business_dashboard", { state: propsToPass });
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 450 }}
        size="small"
        aria-label="a dense table"
        className="bg-chars"
      >
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Details</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.business_name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.details}</TableCell>
              <TableCell align="right">
                <button
                  className="bg-color1 text-chars p-1 w-12 rounded-md hover:border-chars"
                  onClick={handleClick(row.business_id, row.business_name)}
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BusinessTable;
