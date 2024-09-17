import React, { useEffect, useState } from "react";
import SelectorModel from "./SelectorModel";
import { getChequesByRouteAndDate } from "../../../server_data/api";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Cheques = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedBills, setSelectedBills] = useState([]);
  const navigate = useNavigate();

  const { business_id } = useParams();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRouteChange = (routeId) => {
    setSelectedRoute(routeId);
  };

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChequesByRouteAndDate(
          business_id,
          selectedDate,
          selectedRoute
        );
        console.log("API Response:", response); // Check what is being returned
        setSelectedBills(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedDate && selectedRoute) {
      fetchData();
    }
  }, [selectedDate, selectedRoute, business_id]);

  // Calculate the total value of the credit bills
  const totalValue = Array.isArray(selectedBills)
    ? selectedBills.reduce((acc, bill) => acc + bill.value, 0)
    : 0;
  return (
    <div>
      <div className="flex flex-row justify-evenly p-2 bg-bag text-chars font-serif">
        <div className="flex items-center space-x-2 text-xl hover:text-color1">
          <IoArrowBackCircleSharp />
          <button onClick={goBack} className="text-white ">
            Back
          </button>
        </div>
        <h1>Credit Bills</h1>
      </div>
      <div>
        <SelectorModel
          selectedRoute={selectedRoute}
          onDateChange={handleDateChange}
          onRouteChange={handleRouteChange}
        />
      </div>

      {/* Table to display selectedBills */}
      <div className="max-h-64 overflow-y-scroll m-5">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Is Payment Received</th>
            </tr>
          </thead>
          <tbody>
            {selectedBills.length > 0 ? (
              selectedBills.map((bill, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{bill.name}</td>
                  <td className="border px-4 py-2">{bill.value}</td>
                  <td className="border px-4 py-2">{bill.date}</td>
                  <td className="border px-4 py-2">
                    <button>Received</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="3">
                  No data available
                </td>
              </tr>
            )}

            {/* Row to display the total value */}
            <tr className="bg-gray-200 font-bold">
              <td className="border px-4 py-2 text-right" colSpan="2">
                Total:
              </td>
              <td className="border px-4 py-2">{totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cheques;
