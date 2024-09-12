import React, { useEffect, useState } from "react";
import { getDailyLoading, sendDailyUnloading } from "../../../server_data/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CashTable from "./components/CashTable";
import CreditTable from "./components/CreditTable";
import CreditReceived from "./components/CreditReceived";
import ChequeDetail from "./components/ChequeDetail";
import Expences from "./components/Expences";
import ReturnDetails from "./components/ReturnDetails";
import Salary from "./components/Salary";
import CurrentDate from "../../../Modal/CurrentDate";

const Unloading = (props) => {
  const [data, setData] = useState();
  const business_id = props.id;
  const [rows, setRows] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDailyLoading(business_id);
        if (response) {
          setData(JSON.stringify(response, null, 2));
          console.log(response);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (business_id) {
      getData();
    }
  }, [business_id]);

  useEffect(() => {
    let parsedData = [];
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse DataList:", error);
    }

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      const newRows = parsedData.map((e) => ({
        batch_number: e.batch_number,
        item_name: e.item_name,
        cases: e.cases,
        pieces: e.pieces,
        unit_price: e.unit_price,
        free_case: e.free_case,
        free_pieces: e.free_pieces,
        number_of_items_per_case: e.number_of_items_per_case,
        date: e.date,
      }));
      setRows(newRows);
      setInputValues(
        newRows.map(() => ({
          add_cases: 0,
          add_pieces: 0,
          add_free_cases: 0,
          add_free_pieces: 0,
        }))
      );
    }
  }, [data]);

  if (rows.length === 0) {
    return <div>No valid data available. Please check the data format.</div>;
  }
  const handleInputChange = (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = Number(value);
    setInputValues(newInputValues);
  };

  const handleSave = async () => {
    const dataToSave = rows.map((row, index) => ({
      ...row,
      add_cases: inputValues[index].add_cases,
      add_pieces: inputValues[index].add_pieces,
      add_free_cases: inputValues[index].add_free_cases,
      add_free_pieces: inputValues[index].add_free_pieces,
    }));
    console.log(dataToSave);

    try {
      for (const data of dataToSave) {
        console.log(data);

        const response = await sendDailyUnloading(
          business_id,
          data.batch_number,
          data.item_name,
          data.add_cases,
          data.add_pieces,
          data.unit_price,
          data.total_price,
          data.add_free_cases,
          data.add_free_pieces,
          "2024-08-10",
          "Sunny"
        );
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CurrentDate />
      <div className="p-10 h-90 overflow-auto text-center">
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
                <TableCell align="right">Cases</TableCell>
                <TableCell align="right">Pieces</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Free Cases</TableCell>
                <TableCell align="right">Free Pieces</TableCell>
                <TableCell align="right">Add Cases</TableCell>
                <TableCell align="right">Add Pieces</TableCell>
                <TableCell align="right">Add Free Cases</TableCell>
                <TableCell align="right">Add Free Pieces</TableCell>
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
                  <TableCell align="right">{row.cases}</TableCell>
                  <TableCell align="right">{row.pieces}</TableCell>
                  <TableCell align="right">{row.unit_price}</TableCell>
                  <TableCell align="right">{row.free_case}</TableCell>
                  <TableCell align="right">{row.free_pieces}</TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      value={inputValues[index]?.add_cases || 0}
                      onChange={(e) =>
                        handleInputChange(index, "add_cases", e.target.value)
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      value={inputValues[index]?.add_pieces || 0}
                      onChange={(e) =>
                        handleInputChange(index, "add_pieces", e.target.value)
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      value={inputValues[index]?.add_free_cases || 0}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "add_free_cases",
                          e.target.value
                        )
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      value={inputValues[index]?.add_free_pieces || 0}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "add_free_pieces",
                          e.target.value
                        )
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={handleSave}
          className="mt-4 w-30 bg-buttons text-chars p-2 rounded hover:bg-bag"
        >
          Save
        </button>
      </div>

      {/* Other Datails Section */}
      <ReturnDetails />
      <div className="ml-5 mr-5 p-5 border-2 border-b-buttons w-full rounded">
        {/* Money Entering Section */}
        <div className="flex flex-row justify-evenly overflow-y-auto h-60">
          <CashTable />
          <CreditTable />
          <CreditReceived />
        </div>
      </div>
      <div>
        <ChequeDetail id={business_id} />
      </div>
      <div className="flex flex-row m-5 justify-between">
        <Salary id={business_id} />
        <Expences id={business_id} />
      </div>
    </div>
  );
};

export default Unloading;
