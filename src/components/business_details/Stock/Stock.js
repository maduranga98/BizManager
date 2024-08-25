import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { addStock, getallItems } from "../../../server_data/api";
import { useParams } from "react-router-dom";
const Stock = (props) => {
  const { business_id } = useParams();
  console.log(business_id);
  const [dataList, setDataList] = useState();
  const [rows, setRows] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getallItems(business_id);
        setDataList(JSON.stringify(response, null, 2));
        console.log(dataList);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };
    if (business_id) {
      getData();
    }
  }, [business_id]);

  useEffect(() => {
    let parsedData = [];
    try {
      parsedData = JSON.parse(dataList);
    } catch (error) {
      console.error("Failed to parse DataList:", error);
    }

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      const newRows = parsedData.map((e) => ({
        batch_number: e.batch_number,
        item_name: e.item_name,
        unit_price: e.unit_price,
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
  }, [dataList]);

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

        const response = await addStock(
          business_id,
          data.batch_number,
          data.item_name,
          data.add_cases,
          data.add_pieces,
          data.unit_price,
          data.add_free_cases,
          data.add_free_pieces,
          data.number_of_items_per_case,
          "2024-08-10"
        ); // Send each data object separately
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (rows.length === 0) {
    return <div>No valid data available. Please check the data format.</div>;
  }
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
          className="mt-4 bg-buttons text-chars p-2 rounded hover:bg-bag"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Stock;
