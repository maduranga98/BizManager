import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDetails } from "../../../server_data/api";

const Details = (props) => {
  const business_id = props.id;
  console.log(business_id);
  const [dataList, setDataList] = useState("");
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const gettingDetails = async () => {
      try {
        const response = await getDetails(business_id);
        console.log(response);
        setDataList(JSON.stringify(response, null, 2));
      } catch (error) {
        console.error(error);
      }
    };
    if (business_id) {
      gettingDetails();
    }
  }, [business_id]);
  useEffect(() => {
    let parsedData = [];
    try {
      parsedData = JSON.parse(dataList);
      console.log(parsedData);
    } catch (error) {
      console.error("Failed to parse DataList:", error);
    }

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      const newRows = parsedData.map((e) => ({
        batch_number: e.batch_number,
        item_name: e.item_name,
        unit_price: e.unit_price,
        cases: e.difference_in_cases,
        pieces: e.difference_in_pieces,
        free_case: e.difference_in_free_cases,
        free_pieces: e.difference_in_free_pieces,
        total: e.total_price,
        route: e.route,
        climate: e.climate,
      }));
      setRows(newRows);
    }
  }, [dataList]);

  if (rows.length === 0) {
    console.log(rows);
    return <div>No valid data available. Please check the data format.</div>;
  }
  let totalValue = 0;
  return (
    <div>
      <div className="p-10 h-[50%] overflow-auto">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 450 }}
            size="small"
            aria-label="a dense table"
            className="bg-chars"
          >
            <TableHead className="font-serif text-2xl text-chars">
              <TableRow className="bg-bag">
                <TableCell>Batch Number</TableCell>
                <TableCell align="right">Item Name</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Cases</TableCell>
                <TableCell align="right">Pieces</TableCell>
                <TableCell align="right">Free Cases</TableCell>
                <TableCell align="right">Free Pieces</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.batch_number}
                  </TableCell>
                  <TableCell align="right">{row.item_name}</TableCell>
                  <TableCell align="right">{row.unit_price}</TableCell>
                  <TableCell align="right">{row.cases}</TableCell>
                  <TableCell align="right">{row.pieces}</TableCell>
                  <TableCell align="right">{row.free_case}</TableCell>
                  <TableCell align="right">{row.free_pieces}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="text-center">
        <h1>Details</h1>
        Total Sale:
        {rows.reduce((totalValue, e) => totalValue + Number(e.total), 0)}
      </div>
    </div>
  );
};

export default Details;
