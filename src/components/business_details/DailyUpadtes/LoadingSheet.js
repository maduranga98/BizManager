import React, { useEffect, useState } from "react";
import { dailyLoading, getStock } from "../../../server_data/api";
import CurrentDate from "../../../Modal/CurrentDate";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WeatherSelector from "../../../Modal/WeatherSelector";

const LoadingSheet = (props) => {
  const business_id = props.id;
  const [dataList, setDataList] = useState(null); // Initialize as null to handle properly in effect.
  const [rows, setRows] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStock(business_id);
        setDataList(response); // Store directly as an object/array, no need to stringify.
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };
    if (business_id) {
      getData();
    }
  }, [business_id]);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (!dataList) return; // Ensure dataList exists.

    try {
      if (Array.isArray(dataList) && dataList.length > 0) {
        const newRows = dataList.map((e) => ({
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
      } else {
        console.log("No valid data received.");
      }
    } catch (error) {
      console.error("Failed to process data:", error);
    }
  }, [dataList]);

  const handleInputChange = (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = Number(value);
    setInputValues(newInputValues);
  };
  const handleWeatherChange = (weather) => {
    setSelectedWeather(weather);
    console.log("Selected Weather: ", weather);
  };
  const handleSave = async () => {
    const dataToSave = rows.map((row, index) => ({
      ...row,
      add_cases: inputValues[index].add_cases,
      add_pieces: inputValues[index].add_pieces,
      add_free_cases: inputValues[index].add_free_cases,
      add_free_pieces: inputValues[index].add_free_pieces,
    }));

    try {
      for (const data of dataToSave) {
        const response = await dailyLoading(
          business_id,
          data.batch_number,
          data.item_name,
          data.add_cases,
          data.add_pieces,
          data.unit_price,
          data.add_cases * data.unit_price +
            data.add_pieces * (data.unit_price / data.number_of_items_per_case), // Example total price calculation
          data.add_free_cases,
          data.add_free_pieces,
          formattedDate, // Use the correctly formatted date
          selectedWeather
        );
        console.log(response);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (rows.length === 0) {
    return <div>No valid data available. Please check the data format.</div>;
  }

  return (
    <div>
      <CurrentDate />
      <WeatherSelector onWeatherChange={handleWeatherChange} />
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
                      // value={inputValues[index]?.add_cases || 0}
                      onChange={(e) =>
                        handleInputChange(index, "add_cases", e.target.value)
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      // value={inputValues[index]?.add_pieces || 0}
                      onChange={(e) =>
                        handleInputChange(index, "add_pieces", e.target.value)
                      }
                      className="border-2 border-black rounded-md p-1 w-12"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      // value={inputValues[index]?.add_free_cases || 0}
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
                      // value={inputValues[index]?.add_free_pieces || 0}
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
        {selectedWeather ? (
          <button
            onClick={handleSave}
            className="mt-4 bg-buttons text-chars p-2 rounded hover:bg-bag"
          >
            Save
          </button>
        ) : (
          <p>Please Select the weather</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSheet;
