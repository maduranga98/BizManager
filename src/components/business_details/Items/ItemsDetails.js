import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getallItems } from "../../../server_data/api";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";

import AddStock from "./AddStock";

const ItemsDetails = () => {
  const { business_id } = useParams();
  const [dataList, setDataList] = useState();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await getallItems(business_id);
        setDataList(JSON.stringify(responce, null, 2));
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };
    if (business_id) {
      getData();
    }
  }, [showForm]);
  function createData(
    batch_number,
    item_name,
    unit_price,
    number_of_items_per_case,
    date
  ) {
    return {
      batch_number,
      item_name,
      unit_price,
      number_of_items_per_case,
      date,
    };
  }
  let parsedData = [];
  try {
    parsedData = JSON.parse(dataList);
  } catch (error) {
    console.error("Failed to parse DataList:", error);
  }
  const isValidData = Array.isArray(parsedData) && parsedData.length > 0;
  const rows = isValidData
    ? parsedData.map((e) =>
        createData(
          e.batch_number,
          e.item_name,
          e.unit_price,
          e.number_of_items_per_case,
          e.date
        )
      )
    : [];

  // if (!isValidData) {
  //   return <div>No valid data available. Please check the data format.</div>;
  // }
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    return `${year}-${month}-${day}`;
  }
  const onClick = (event) => {
    event.preventDefault();
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  return (
    <div>
      <div className="bg-bag font-serif font-bold flex flex-row justify-between p-3 relative top-0">
        <button
          className="text-4xl text-color1 hover:text-stacks"
          onClick={handleClick}
        >
          <IoArrowBackCircle />
        </button>
        <h1>Business Name</h1>
        <button
          onClick={onClick}
          className="bg-color1 p-2 text-md font-serif rounded-md text-bag hover:border-chars border-2"
        >
          Add Items
        </button>
      </div>
      {isValidData ? (
        <div className="p-5">
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
                  <TableCell align="right">No of Items Per Case</TableCell>
                  <TableCell align="right">Date Added</TableCell>
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
                      {row.batch_number}
                    </TableCell>
                    <TableCell align="right">{row.item_name}</TableCell>
                    <TableCell align="right">{row.unit_price}</TableCell>
                    <TableCell align="right">
                      {row.number_of_items_per_case}
                    </TableCell>
                    <TableCell align="right">{formatDate(row.date)}</TableCell>
                    <TableCell align="right">
                      <button>
                        <FaPencilAlt />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>
          No valid data available or Added data. Please check the data format or
          add the data .
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className=" rounded-lg shadow-lg max-w-md w-full">
            <AddStock onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsDetails;
