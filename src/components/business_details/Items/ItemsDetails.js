import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  addCompanyCheques,
  addStock,
  getallItems,
} from "../../../server_data/api";
import AddStock from "./AddStock";

const ItemsDetails = () => {
  const { business_id } = useParams();
  const [dataList, setDataList] = useState();
  const [showForm, setShowForm] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const cValue = useRef();
  const cDate = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getallItems(business_id);
        setDataList(JSON.stringify(response, null, 2));
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month}-${day}`;
  }

  // Handle input change to store values in state
  const handleInputChange = (index, field, value) => {
    const updatedValues = [...inputValues];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][field] = value;
    setInputValues(updatedValues);
  };

  // Handle form submission to collect all data
  const handleSubmit = () => {
    const combinedData = rows.map((row, index) => ({
      ...row,
      cases: inputValues[index]?.cases || 0,
      units: inputValues[index]?.units || 0,
      freeCases: inputValues[index]?.freeCases || 0,
      freeUnits: inputValues[index]?.freeUnits || 0,
    }));

    const data = {
      value: cValue.current.value,
      date: cDate.current.value,
    };
    console.log("Combined Data:", combinedData, data);
    const date = new Date();
    const sendStock = async () => {
      for (const data of combinedData) {
        const response = await addStock(
          business_id,
          data.batch_number,
          data.item_name,
          data.cases,
          data.units,
          data.unit_price,
          data.freeCases,
          data.freeUnits,
          data.number_of_items_per_case,
          date
        );
        console.log(data);
      }
    };
    const addCheques = async () => {
      const response = await addCompanyCheques(
        business_id,
        data.value,
        data.date,
        date
      );
      console.log(response);
    };
    sendStock();
    addCheques();
  };

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
          Back
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
          <table className="table-auto w-full text-center rounded h-60 overflow-auto">
            <thead className="bg-bag text-chars font-serif p-2">
              <tr>
                <th>Batch Number</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>No of Items Per Case</th>
                <th>Date Added</th>
                <th>Cases</th>
                <th>Units</th>
                <th>Free Cases</th>
                <th>Free Units</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="m-1">
                  <td>{row.batch_number}</td>
                  <td>{row.item_name}</td>
                  <td>{row.unit_price}</td>
                  <td>{row.number_of_items_per_case}</td>
                  <td>{formatDate(row.date)}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border"
                      onChange={(e) =>
                        handleInputChange(index, "cases", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border"
                      onChange={(e) =>
                        handleInputChange(index, "units", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border"
                      onChange={(e) =>
                        handleInputChange(index, "freeCases", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border"
                      onChange={(e) =>
                        handleInputChange(index, "freeUnits", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col justify-center items-center w-72 border border-bag rounded-md p-4 font-serif content-center mx-auto mt-10">
            <h1 className="text-lg font-bold mb-4">
              Enter Company Cheque Details
            </h1>

            <label htmlFor="cvalue" className="mb-2">
              Enter the Cheque Value
            </label>
            <input
              id="value"
              placeholder="Cheque value"
              ref={cValue}
              type="number"
              className="w-full p-2 border rounded-md mb-4"
            />

            <label htmlFor="cdate" className="mb-2">
              Enter the Cheque Date
            </label>
            <input
              id="cdate"
              ref={cDate}
              placeholder="Date"
              type="date"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-5 bg-color1 text-chars p-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          No valid data available. Please check the data format or add the data.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg shadow-lg max-w-md w-full">
            <AddStock onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsDetails;
